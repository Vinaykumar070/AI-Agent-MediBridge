"use client";
import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import TimeAgo from "react-timeago";
import { cn } from "@/lib/utils";
import { useNavigation } from "@/lib/context/navigation";
import { Avatar } from "@radix-ui/react-avatar";
import { useEffect, useState } from "react";
import { EditIcon, MessageSquareX } from 'lucide-react';
import { deleteAll } from '@/services/Conversation';

function ChatRow({
  chat,
  onDelete,
}: {
  chat: any;
  onDelete: (chatId: string, chat: string) => void;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = chat?._id;

  const params: any = useParams<{ tag: string; item: string }>();
  const [lastMessage, setLastMessage] = useState<any>({})
  const [isLoading, setIsLoading] = useState(false);

  const { closeMobileNav } = useNavigation();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response: any = await fetch(`/api/chat/conversation?chatId=${chatId}`, {
        method: "GET",
      });
      const { data } = await response.json();
      setLastMessage(data);
      setIsLoading(false);
    })()
  }, []);


  const handleClick = () => {
    // redirect(`/dashboard/${params?.chat}/?chatId=${chat._id}`);
    router.push(`/dashboard/${params?.chat}/?chatId=${chat._id}`);
    closeMobileNav();
  };

  return (
    <>
      {!isLoading &&
        <div
          className="my-2 min-h-20 space-y-1 text-gray-800 rounded-xl border border-gray-400/30 backdrop-blue-sm hover:bg-gray-400 hover:text-black transition-all duration-200 cursor-pointer hover:shadow-md"
          onClick={handleClick}
        >
          <div className="p-2">
            <div className="flex justify-between items-start">
              <div
                className={`w-8 h-8 rounded-full border-2 bg-white border-gray-100  flex items-center justify-center shadow-sm`}
              >
                <div className="relative">
                  <Avatar className="w-8 h-8 rounded-full border-2 bg-white border-gray-100  flex items-center justify-center shadow-sm">
                    {/* <AvatarImage src={'https://picsum.photos/200'} /> */}
                  </Avatar>
                  <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                </div>
              </div><br />
              <div className="text-sm text-white truncate p-2 flex-1 font-medium">
                {lastMessage ? (
                  <span className="text-black b dark:text-white text-xs">
                    {lastMessage?.role === "user" ? `You: (${chat?.name})` : `AI (${chat?.name})`}
                    <p>{lastMessage?.content?.replace(/\\n/g, "\n")}</p>
                  </span>
                ) : (
                  <span className="text-black dark:text-white">New conversation</span>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-70 rounded-full hover:bg-white dark:hover:bg-black"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chatId, params?.chat);
                }}
              >
                <EditIcon className="h-4 w-4 text-black hover:text-black transition-colors dark:text-white" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="opacity-70 rounded-full hover:bg-white dark:hover:bg-black"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(chatId, params?.chat);
                }}
              >
                <MessageSquareX className="h-4 w-4 text-black  transition-colors dark:text-white" />
              </Button>

            </div>
            <p className="text-xs text-gray-800 mt-1.5 font-medium text-black text-black b dark:text-white">
              <TimeAgo date={lastMessage ? lastMessage?.createdAt : chat?.createdAt} />
            </p>
          </div>
        </div>
      }
    </>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const params: any = useParams<{ tag: string; item: string }>();
  const { isMobileNavOpen, closeMobileNav } = useNavigation();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      return await fetchChats();
    })();
  }, [])

  const fetchChats = async () => {
    try {
      let response: any = await fetch("/api/chat", {
        method: "GET",
      });
      const { data } = await response.json();
      setChats(data);
      setIsLoading(false);
    } catch (err) {
    }
  }

  const newChat = async () => {
    try {
      const res: any = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: 'Untitled' }),
      });
      fetchChats();
      closeMobileNav();
      router.push(`/dashboard/${params?.chat}?cahtId=${res?.chatId}`);
    } catch (err) {
    }
  }

  const handleNewChat = async () => {
    await newChat()
  };

  const handleDeleteChat = async (chatId: any, chat: string) => {
    await deleteAll(chatId);
    router.push(`/dashboard/${chat}?cahtId=${chatId}`);
    // If we're currently viewing this chat, redirect to dashboard
    // if (window.location.pathname.includes(chatId)) {
    //   router.push("/dashboard");
    // }
  };

  return (
    <>
      {/* Background Overlay for mobile */}
      {!isLoading && isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={closeMobileNav}
        />
      )}
      {!isLoading &&
        <div
          className={cn(
            "fixed md:inset-y-0 top-16 bottom-0 left-0 z-50 w-72 bg-gray-50/80 p-4 bg-white backdrop-blur-xl border border-gray-200 rounded-lg shadow-sm transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:top-0 flex flex-col",
            isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-2 border-b border-gray-200/50">
            <button
              onClick={handleNewChat}
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-2 font-medium rounded-lg text-sm px-10 py-3 text-center me-2 mb-2 group relative inline-flex items-center justify-center px-8 py-3.5 text-base text-white bg-gradient-to-r duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              <PlusIcon className="mr-2 h-4 w-4 " /> New Chat
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-900/20 to-gray-800/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            {/* <Button
            onClick={handleNewChat}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-200/50 shadow-sm hover:shadow transition-all duration-200"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> New Chat
          </Button> */}
          </div>
          <div className=" flex-1 overflow-y-auto w-full max-w-sm p-2 bg-white border border-gray-300 rounded-lg shadow-sm  dark:bg-gray-800 dark:border-gray-700">

            {/* <div className="flex-1 overflow-y-auto space-y-2.5 p-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"> */}
            {!isLoading && chats?.map((chat: any) => (
              <ChatRow key={chat._id} chat={chat} onDelete={handleDeleteChat} />
            ))}
          </div>
        </div>
      }
    </>
  );
}
