import {
  BaseMessage,
  HumanMessage,
  SystemMessage,
  trimMessages,
  AIMessage,
} from "@langchain/core/messages";
import {
  END,
  MessagesAnnotation,
  START,
  StateGraph,
} from "@langchain/langgraph";
import { MemorySaver } from "@langchain/langgraph";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import SYSTEM_MESSAGE from "@/constants/systemMessage";
import { ChatDeepSeek } from "@langchain/deepseek";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import {
  getEmployeeData,
  createEmployee,
  createBulkEmployees,
  getWeather,
  sendEmail,
} from "@/lib/tools";
import {
  createEmployeesExpense,
  employeesExpense,
} from "./tools/employeeExpense";

import { createCustomerOnboarding, getCustomerDetails } from "./tools/customer";
import { createDoctorsTool, listDoctorsTool } from "./tools/doctor"; // 


// Trim the messages to manage conversation history
const trimmer = trimMessages({
  maxTokens: 10,
  strategy: "last",
  tokenCounter: (msgs) => msgs.length,
  includeSystem: true,
  allowPartial: false,
  startOn: "human",
});

// Connect to the OpenAI LLM provider
const initialiseDeepSeekModel = () => {
  const model = new ChatDeepSeek({
    model: "deepseek-chat",
    temperature: 0,
    apiKey: process.env.DEEPSEEK_API_KEY,
    // other params...
  });

  return model;
};

// Define the function that determines whether to continue or not
function shouldContinue(state: typeof MessagesAnnotation.State) {
  const messages = state.messages;
  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage.tool_calls?.length) {
    return "tools";
  }

  // If the last message is a tool message, route back to agent
  if (lastMessage.content && lastMessage._getType() === "tool") {
    return "agent";
  }

  // Otherwise, we stop (reply to the user)
  return END;
}

const tools = [
  getEmployeeData,
  createEmployee,
  createBulkEmployees,
  getWeather,
  sendEmail,
  createEmployeesExpense,
  employeesExpense,
  createCustomerOnboarding,
  getCustomerDetails,
  createDoctorsTool,
  listDoctorsTool
  
];
const toolNode = new ToolNode(tools);

// Define a new graph
const AIModels = ["openai", "anthropic", "deepseek", "groq", "ollama"];
const createWorkflow = () => {
  const LLM_Model = initialiseDeepSeekModel();
  const model = LLM_Model.bindTools(tools);

  return new StateGraph(MessagesAnnotation)
    .addNode("agent", async (state) => {
      // Agent message content
      const systemContent = SYSTEM_MESSAGE;

      // Create the prompt template with system message and messages placeholder
      const promptTemplate = ChatPromptTemplate.fromMessages([
        new SystemMessage(systemContent, {
          cache_control: { type: "ephemeral" },
        }),
        new MessagesPlaceholder("messages"),
      ]);

      // Trim the messages to manage conversation history
      const trimmedMessages = await trimmer.invoke(state.messages);

      // Format the prompt with the current messages
      const prompt = await promptTemplate.invoke({ messages: trimmedMessages });

      // Get response from the model
      const response = await model.invoke(prompt);

      return { messages: [response] };
    })
    .addEdge(START, "agent")
    .addNode("tools", toolNode)
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue);
};

function addCachingHeaders(messages: BaseMessage[]): BaseMessage[] {
  if (!messages.length) return messages;

  // Create a copy of messages to avoid mutating the original
  const cachedMessages = [...messages];

  // Helper to add cache control
  const addCache = (message: BaseMessage) => {
    message.content = [
      {
        type: "text",
        text: message.content as string,
        cache_control: { type: "ephemeral" },
      },
    ];
  };

  // Cache the last message
  // console.log("🤑🤑🤑 Caching last message");
  addCache(cachedMessages.at(-1)!);

  // Find and cache the second-to-last human message
  let humanCount = 0;
  for (let i = cachedMessages.length - 1; i >= 0; i--) {
    if (cachedMessages[i] instanceof HumanMessage) {
      humanCount++;
      if (humanCount === 2) {
        // console.log("🤑🤑🤑 Caching second-to-last human message");
        addCache(cachedMessages[i]);
        break;
      }
    }
  }

  return cachedMessages;
}

export async function deepseekSubmitQuestion(
  messages: BaseMessage[],
  chatId: string | number | any
) {
  // Add caching headers to messages
  const cachedMessages = addCachingHeaders(messages);
  // console.log("Messages:", cachedMessages);

  // Create workflow with chatId and onToken callback
  const workflow = createWorkflow();

  // Create a checkpoint to save the state of the conversation
  const checkpointer = new MemorySaver();
  const app = workflow.compile({ checkpointer });

  const stream = await app.streamEvents(
    { messages: cachedMessages },
    {
      version: "v2",
      configurable: { thread_id: chatId },
      streamMode: "messages",
      runId: chatId,
    }
  );
  return stream;
}
