"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BrainIcon, CopyIcon, StarsIcon, ThumbsDownIcon, ThumbsUpIcon, TimerIcon } from "lucide-react";
import { useEffect, useState } from "react";
import TimeAgo from "react-timeago";


interface MessageBubbleProps {
  content: string;
  createdAt?: Date;
  isUser?: boolean;
}

const formatMessage = (content: string): string => {
  // First unescape backslashes
  content = content.replace(/\\\\/g, "\\");

  // Then handle newlines
  content = content.replace(/\\n/g, "\n");

  // Remove only the markers but keep the content between them
  content = content.replace(/---START---\n?/g, "").replace(/\n?---END---/g, "");

  // Trim any extra whitespace that might be left
  return content.trim();
};

export function MessageBubble({ content, isUser, createdAt = new Date() }: MessageBubbleProps) {
  // const data = [new ClipboardItem({ [String(content)]: content })];
  const { user } = { user: { firstName: 'Fin', lastName: 'Chals', imageUrl: 'https://picsum.photos/200' } };
  const [copied, setCopied] = useState<boolean>(false);

  return (
    <div className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
      {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image" /> */}
      {/* <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
          </div>
          <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
        </div> */}
      {/* </div> */}

      <div
        className={`rounded-2xl px-4 py-2.5 duration-300 max-w-[85%] md:max-w-[75%] shadow-sm ring-1 ring-inset relative ${isUser
          ? "bg-blue-600 text-white rounded-br-none ring-blue-600 hover:bg-blue-500"
          : "bg-white text-gray-900 rounded-bl-none ring-gray-200 hover:bg-gray-200"
          }`}
      >
        {/* <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm text-gray-900 dark:text-white">{isUser ? 'User' : 'AI'}</span>
        </div> */}
        <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: formatMessage(content) }} />
          <div className="flex right gap-2" style={isUser ? { float: 'left', marginTop: 5 } : { float: 'right', marginTop: 2 }}>
            {copied ?
              <div className={`w-5 h-5 flex text-green-500 text-xs`}>✔︎</div>
              :
              <div className="flex gap-2">
                <div className={`w-5 h-5 flex`}>
                  <CopyIcon
                    onClick={async () => {
                      await navigator.clipboard.writeText(isUser ? content : formatMessage(content));
                      setCopied(true);
                      setTimeout(() => {
                        setCopied(false);
                      }, 700);
                    }}
                    className={`h-3 w-3 text-gray-900 ${copied ? "text-blue-600 color-blue-700" : "text-black-700"}`} />
                </div>
              </div>
            }
            {!isUser ?
              <div className="flex gap-2">
                <div className={`w-5 h-5 flex`}>
                  <StarsIcon
                    className={`h-3 w-3 text-orange-700`} />
                </div>
                <div className={`w-5 h-5 flex`}>
                  <ThumbsUpIcon
                    className={`h-3 w-3 text-green-700 bg-green`} />
                </div>
                <div className={`w-5 h-5 flex`}>
                  <ThumbsDownIcon
                    className={`h-3 w-3 text-orange-600`} />
                </div>
                <div className={`text-xs gap-1.5 flex`}>
                  <TimerIcon
                    className={`h-3.5 w-3.5 text-black-600`} /> <TimeAgo date={createdAt} />
                </div>
              </div>
              :
              <div className="flex gap-2">
                <div className={`w-5 h-5 rounded-full flex`}>
                  <StarsIcon
                    className={`h-3 w-3 text-orange-600`} />
                </div>
                <div className={`text-xs gap-1.5 flex`}>
                  <TimerIcon
                    className={`h-3.5 w-3.5 text-black-600`} /> <TimeAgo date={createdAt} />
                </div>
              </div>
            }
          </div>
          <div
            className={`absolute bottom-0 ${isUser
              ? "right-0 translate-x-1/2 translate-y-1/2"
              : "left-0 -translate-x-1/2 translate-y-1/2"
              }`}>
            <div
              className={`w-8 h-8 rounded-full border-2 ${isUser ? "bg-white border-blue-500" : "bg-blue-600 border-white"
                } flex items-center justify-center shadow-sm`}>
              {isUser ? (
                <Avatar className="h-6 w-6 border-blue-600 ">
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback className="text-blue-500 font-bold">
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <>
                  <div className="group flex justify-center">
                    <BrainIcon className="h-5 w-5 text-white" />
                    {/* <span className="absolute top-8 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">✨AI</span> */}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
