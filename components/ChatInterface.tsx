"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatRequestBody, StreamMessageType } from "@/lib/types";
import WelcomeMessage from "@/components/WelcomeMessage";
import { createSSEParser } from "@/lib/SSEParser";
import { MessageBubble } from "@/components/MessageBubble";
import { DownloadCloudIcon, SendHorizonalIcon } from "lucide-react";
import { saveConversation } from "@/services/Conversation";
import { v4 as uuidv4 } from 'uuid';

export interface Messages {
  id: number | string;
  _id: number | string;
  content: string;
  role: string;
  chatId: string | number;
}

interface ChatInterfaceProps {
  chatId: string | number | null;
  initialMessages: Messages[];
}

export default function ChatInterface({
  chatId,
  initialMessages,
}: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [stream, setStream] = useState(false);

  const [streamedResponse, setStreamedResponse] = useState("");
  const [currentTool, setCurrentTool] = useState<{
    name: string;
    input: unknown;
  } | null>(null);

  const [messages, setMessages] = useState<Messages[]>(initialMessages || []);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {
      setMessages([...initialMessages]);
      setStreamedResponse("")
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatId, initialMessages]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  // }, [streamedResponse]);

  const formatToolOutput = (output: unknown): string => {
    if (typeof output === "string") return output;
    return JSON.stringify(output, null, 2);
  };

  const formatTerminalOutput = (
    tool: string,
    input: unknown,
    output: unknown
  ) => {
    const terminalHtml = `
    <div class="bg-[#1e1e1e] text-white font-mono p-2 rounded-md my-2 overflow-x-auto whitespace-normal max-w-[600px]">
      <div class="flex items-center gap-1.5 border-b border-gray-700 pb-1">
        <span class="text-red-500">●</span>
        <span class="text-yellow-500">●</span>
        <span class="text-green-500">●</span>
        <span class="text-gray-400 ml-1 text-sm">~/${tool}</span>
      </div>
      <div class="text-gray-400 mt-1">$ Input</div>
      <pre class="text-yellow-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
      input
    )}</pre>
      <div class="text-gray-400 mt-2">$ Output</div>
      <pre class="text-green-400 mt-0.5 whitespace-pre-wrap overflow-x-auto">${formatToolOutput(
      output
    )}</pre>
    </div>`;

    return `---START---\n${terminalHtml}\n---END---`;
  };

  /**
   * Processes a ReadableStream from the SSE response.
   * This function continuously reads chunks of data from the stream until it's done.
   * Each chunk is decoded from Uint8Array to string and passed to the callback.
   */
  const processStream = async (
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onChunk: (chunk: string) => Promise<void>
  ) => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await onChunk(new TextDecoder().decode(value));
      }
    } catch (e) {
      console.log('Process Stream ERROR:', e)
    } finally {
      reader.releaseLock();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;
    // Reset UI state for new message
    setInput("");
    setStreamedResponse("");
    setCurrentTool(null);
    setIsLoading(true);

    // Add user's message immediately for better UX
    const optimisticUserMessage: any = {
      _id: `temp_${Date.now()}`,
      chatId,
      //chatId: Date.now().toString(), // Or use UUID library
      content: trimmedInput,
      role: "user",
      createdAt: Date.now(),
    };

    // Track complete response for saving to database
    let fullResponse = "";
    try {
      // Prepare chat history and new message for API
      // const requestBody: ChatRequestBody = {
      const requestBody: any = {
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        newMessage: trimmedInput,
        chatId,
      };

      // Initialize SSE connection
      const response = await fetch("/api/chat/conversation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error(await response.text());
      if (!response.body) throw new Error("No response body available");
      setMessages((prev) => [...prev, optimisticUserMessage]);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

      // Create SSE parser and stream reader
      const parser = createSSEParser();
      const reader = response.body.getReader();
      // Process the stream chunks
      await processStream(reader, async (chunk) => {
        // Parse SSE messages from the chunk
        const messages = parser.parse(chunk);
        // Handle each message based on its type
        for (const message of messages) {
          switch (message.type) {
            case StreamMessageType.Token:
              // Handle streaming tokens (normal text response)
              if ("token" in message) {
                fullResponse += message.token;
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolStart:
              // Handle start of tool execution (e.g. API calls, file operations)
              if ("tool" in message) {
                setCurrentTool({
                  name: message.tool,
                  input: message.input,
                });
                fullResponse += formatTerminalOutput(
                  message.tool,
                  message.input,
                  "Processing..."
                );
                setStreamedResponse(fullResponse);
              }
              break;

            case StreamMessageType.ToolEnd:
              // Handle completion of tool execution
              if ("tool" in message && currentTool) {
                // Replace the "Processing..." message with actual output
                const lastTerminalIndex = fullResponse.lastIndexOf(
                  '<div class="bg-[#1e1e1e]'
                );
                if (lastTerminalIndex !== -1) {
                  fullResponse =
                    fullResponse.substring(0, lastTerminalIndex) +
                    formatTerminalOutput(
                      message.tool,
                      currentTool.input,
                      message.output
                    );
                  setStreamedResponse(fullResponse);
                }
                setCurrentTool(null);
              }
              break;

            case StreamMessageType.Error:
              // Handle error messages from the stream
              if ("error" in message) {
                throw new Error(message.error);
              }
              break;

            case StreamMessageType.Done:
              // Handle completion of the entire response
              const assistantMessage: any = {
                _id: `temp_assistant_${Date.now()}`,
                chatId,
                content: fullResponse,
                role: "ai",
                createdAt: Date.now(),
              };
              setMessages((prev) => [...prev, assistantMessage]);
              setStreamedResponse("");
              // Save the complete message to the database
              await saveConversation({
                 chatId:uuidv4(),
                content: fullResponse,
                role: "ai",
              });
              return;
          }
        }
      });
    } catch (error) {
      // Handle any errors during streaming
      console.error("Error sending message:", error);
      // Remove the optimistic user message if there was an error
      // setMessages((prev) =>
      //   prev.filter((msg) => msg._id !== optimisticUserMessage._id)
      // );

      setStreamedResponse(
        formatTerminalOutput(
          "error",
          "Failed to process message",
          error instanceof Error ? error.message : "Unknown error"
        )
      );
      await saveConversation({
        chatId: uuidv4(),
        content: formatTerminalOutput(
          "error",
          "Failed to process message",
          error instanceof Error ? error.message : "Unknown error"
        ),
        role: "ai",
      });
    } finally {
      setIsLoading(false);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="flex flex-col h-[calc(100vh-theme(spacing.16))]">
      <section className="flex-1 overflow-y-auto bg-gray-50 p-2 md:p-0 pb-90">
        <div className="max-w-4xl mx-auto p-4 space-y-3">
          {messages?.length === 0 && <WelcomeMessage />}
          {messages?.map((message: any) => (
            <MessageBubble
              key={message?._id?.toString()}
              content={message.content}
              createdAt={message?.createdAt}
              isUser={message.role === "user"}
            />
          ))}

          {streamedResponse && <MessageBubble content={streamedResponse} />}
          {/* Loading */}
          {isLoading && !streamedResponse && (
            <div className="flex justify-start animate-in fade-in-0">
              <div className="rounded-2xl px-4 py-3 bg-white text-gray-900 rounded-bl-none shadow-sm ring-1 ring-inset ring-gray-200">
                <div className="flex items-center gap-1.5">
                  {[0.3, 0.15, 0].map((delay, i) => (
                    <div
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: `-${delay}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div className="flex pb-10" ref={messagesEndRef} />
        </div>
      </section>

      {/* Input form */}
      <footer className="p-1 bg-gray-50 shadow-md">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative">
          <div className="relative flex items-center">
            {messages?.length > 0 && (
              <div
                className={`absolute  rounded-xl h-9 w-9 p-2 flex items-center justify-center transition-all bg-blue-600 hover:bg-blue-700 text-white shadow-sm`}
              >
                <DownloadCloudIcon />
              </div>
            )}
            <input
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your Message..."
              className="flex-1 py-4 ml-12 px-6 rounded-2xl border-1 border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 bg-gray-50 placeholder:text-gray-600 dark:text-gray-900"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`absolute right-2 rounded-xl h-10 w-10 p-0 flex items-center justify-center transition-all ${input.trim()
                ? "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                : "bg-gray-400 text-gray-800"
                }`}
            >
              <SendHorizonalIcon />
            </Button>
          </div>
        </form>
      </footer>
    </main>
  );
}
