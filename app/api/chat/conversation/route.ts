import { NextResponse, NextRequest } from "next/server";
import { AIMessage, HumanMessage, ToolMessage } from "@langchain/core/messages";
import {
  ChatRequestBody,
  StreamMessage,
  StreamMessageType,
  SSE_DATA_PREFIX,
  SSE_LINE_DELIMITER,
} from "@/lib/types";
import { connectDB } from "@/lib/mongoClient";
import Conversation from "@/models/Conversation";
import { saveConversation } from "@/services/Conversation";
import { deepseekSubmitQuestion } from "@/lib/deepseek";
import { v4 as uuidv4 } from 'uuid';

function sendSSEMessage(
  writer: WritableStreamDefaultWriter<Uint8Array>,
  data: StreamMessage
) {
  const encoder = new TextEncoder();
  return writer.write(
    encoder.encode(
      `${SSE_DATA_PREFIX}${JSON.stringify(data)}${SSE_LINE_DELIMITER}`
    )
  );
}

export async function POST(req: Request) {
  try {
    const userId = 1;
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const {
      messages,
      newMessage,
      chatId = "1",
    } = (await req.json()) as ChatRequestBody;

    // Create stream with larger queue strategy for better performance
    const stream = new TransformStream({}, { highWaterMark: 1024 });
    const writer = stream.writable.getWriter();

    const response = new Response(stream.readable, {
      headers: {
        "Content-Type": "text/event-stream",
        // "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no", // Disable buffering for nginx which is required for SSE to work properly
      },
    });

    // Handle the streaming response
    (async () => {
      try {
        // Send initial connection established message
        await sendSSEMessage(writer, { type: StreamMessageType.Connected });

        // Send user message to Convex
        await saveConversation({
          chatId:uuidv4(), // Or use UUID library
          content: newMessage,
          role: "user",
        });

        // Convert messages to LangChain format
        const langChainMessages = [
          ...messages.map((msg) =>
            msg.role === "user"
              ? new HumanMessage(msg.content)
              : new AIMessage(msg.content)
          ),
          new HumanMessage(newMessage),
        ];

        try {
          // Create the event stream
          // const eventStream = await deepseekHandleSubmit(messages, chatId);
          const eventStream = await deepseekSubmitQuestion(
            langChainMessages,
            chatId
          );
          // console.log("============== eventStream", eventStream);

          // Process the events
          for await (const event of eventStream) {
            // console.log("🔄 Event:", event, JSON.stringify(event?.data?.output));
            // console.log("============= event of eventStream", event);
            // Events: on_chat_model_start, on_chat_model_stream, on_chain_stream,
            if (event.event === "on_chat_model_stream") {
              const token = event.data.chunk;
              if (token) {
                // Access the text property from the AIMessageChunk
                const text = token.content;
                if (text) {
                  await sendSSEMessage(writer, {
                    type: StreamMessageType.Token,
                    token: text,
                  });
                }
              }
            } else if (event.event === "on_tool_start") {
              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolStart,
                tool: event.name || "unknown",
                input: event?.data?.input,
              });
            } else if (event.event === "on_tool_end") {
              const toolMessage = new ToolMessage(event?.data?.output);

              await sendSSEMessage(writer, {
                type: StreamMessageType.ToolEnd,
                tool: toolMessage.lc_kwargs.name || "unknown",
                output: event?.data?.output,
              });
            } else if (event.event === "on_chat_model_start") {
              console.log('Started...!')
            } 
            // else if (event.event === "on_chat_model_end") {
            //   // Send completion message
            //   console.log('Ended...!');
            //   await sendSSEMessage(writer, { type: StreamMessageType.Done });
            // }
            // else if (event.event === "on_chain_end") {
            //   // Send completion message
            //   console.log('Ended...!');
            //   console.log("🔄 Event Ended:", event);
            //   // await sendSSEMessage(writer, { type: StreamMessageType.Done });
            // }
          }
          // Send completion message
          await sendSSEMessage(writer, { type: StreamMessageType.Done });
        } catch (streamError) {
          console.error("Error in event stream:", streamError);
          await sendSSEMessage(writer, {
            type: StreamMessageType.Error,
            error:
              streamError instanceof Error
                ? streamError.message
                : "Stream processing failed",
          });
        }
      } catch (error) {
        console.error("Error in stream:", error);
        await sendSSEMessage(writer, {
          type: StreamMessageType.Error,
          error: error instanceof Error ? error.message : "Unknown error",
        });
      } finally {
        try {
          await writer.close();
        } catch (closeError) {
          console.error("Error closing writer:", closeError);
        }
      }
    })();

    return response;
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" } as const,
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const chatId = url.searchParams.get("chatId");
    const conversation = await Conversation.findOne({ chatId: chatId });
    return NextResponse.json({ data: conversation } as const, { status: 200 });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" } as const,
      { status: 500 }
    );
  }
}
