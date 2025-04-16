
"use client"

import { usePathname, useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigation } from "@/lib/context/navigation";
import { ArrowRight, LogOutIcon } from "lucide-react";
import { redirect } from "next/navigation";

export default function Header() {
  const { setIsMobileNavOpen } = useNavigation();
  const params = useParams();
  return (
    <header className="py-3 px-3 cursor-pointer shadow-md z-50 bg-white dark:bg-gray-800 sticky top-0">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileNavOpen(true)}
            className="md:hidden text-gray-500 hover:text-gray-700 hover:bg-gray-100/50"
          >
            <HamburgerMenuIcon className="h-5 w-5" />
          </Button>
          <div className="font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            <h1 className="bg-gradient-to-r from-blue-500 via-cyan-500 to-cyan-500 inline-block text-transparent bg-clip-text">
              AI Agent-  {params?.chat}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex relative items-center font-xs">
            <select id="small" defaultValue="DeepSeek"
              className="text-white transition-all ring-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring font-medium rounded-lg text-sm text-center group relative inline-flex items-center justify-center px-1 py-1 text-white bg-gradient-to-r duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            // className="group relative inline-flex items-center justify-center px-8 py-2.5 text-base font-medium text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-full hover:from-gray-600 hover:to-gray-400 transition-all duration-200"
            >
              <option className='font-xs text-blue-900' disabled>Choose LLM</option>
              <option className='font-xs text-blue-900' value="OpenAI">Open AI</option>
              <option className='font-xs text-blue-900' value="DeepSeek">Deep Seek</option>
              <option className='font-xs text-blue-900' value="Anthropic">Anthropic</option>
              <option className='font-xs text-blue-900' value="Groq">Groq</option>
              <option className='font-xs text-blue-900' value="Ollama">Ollama</option>
            </select>
          </div>
          <button
            onClick={() => redirect("/")}
            className="text-white ring-2 ringrounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl hover:ring-2 font-medium rounded-lg text-sm py-2  px-2 gap-2 text-center group relative inline-flex items-center justify-center text-white bg-gradient-to-r duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <LogOutIcon className="ml-2 h-2.5 w-3  transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
