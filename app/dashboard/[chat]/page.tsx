import { redirect } from "next/navigation";
import ChatInterface from "@/components/ChatInterface";
import { getConversations } from "@/services/Conversation";

interface ChatPageProps {
  params: Promise<{
    chatId: string;
  }>,
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

export interface Messages {
  _id: number | string, content: string, role: string, chatId: string | number
}

export default async function ChatPage({ params, searchParams }: ChatPageProps) {

  try {
    // Get messages
    const queryParams: any = await searchParams;
    const messages: any = await getConversations(queryParams?.chatId);
    // JSON.parse(JSON.stringify(conversations))
    // const messages = conversations?.map((chat: any) => { return { id: chat?._id.toString(), chatId: chat?.chatId, content: chat?.content, role: chat?.role, createdAt: chat?.createdAt, updatedAt: chat?.updatedAt } });

    return (
      <div className="flex-1 overflow-hidden">
        <ChatInterface chatId={queryParams?.chatId} initialMessages={messages} />
      </div>
    );
  } catch (error) {
    console.error("🔥 Error loading chat:", error);
    redirect("/dashboard");
  }
};
