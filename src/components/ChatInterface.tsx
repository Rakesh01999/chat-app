"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "./ChatMessage";
import { PromptKitDemo } from "./PromptKitDemo";
import { messages } from "@/data/messages";
import { PanelRight, X } from "lucide-react";
import { PromptInputWithActions } from "./prompt-kit/PromptInputWithActions";

export const ChatInterface: React.FC = () => {
  const [interactions, setInteractions] = useState<
    Array<{ type: string; data: unknown }>
  >([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptKitInteraction = (type: string, data: unknown) => {
    setInteractions((prev) => [...prev, { type, data }]);
  };

  return (
    <div
      className="
        h-screen flex flex-col md:flex-row
        bg-white text-gray-900 border-gray-200
        dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
      "
    >
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Chat Header */}
        <div
          className="
            p-4 md:p-6 border-b border-gray-200 dark:border-gray-700
            flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3
            sticky top-0 bg-white dark:bg-gray-900 z-10
          "
        >
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-semibold mb-1">
              React State Management Discussion
            </h2>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
              AI Assistant helping with coding questions
            </p>
          </div>

          {/* Toggle Sidebar Button (mobile only) */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden ml-2 p-2 rounded-lg border bg-gray-100 dark:bg-gray-800"
          >
            <PanelRight className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages (scrollable everywhere) */}
        <div
          ref={scrollAreaRef}
          className="
            flex-1 min-h-0 overflow-y-auto
            px-4 md:px-6 py-4 space-y-6
          "
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        {/* Chat Input */}
        {/* <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 mb-10">
          <PromptInputWithActions />
        </div> */}
        <div className="border-t border-gray-200 dark:border-gray-700 mb-10">
          <PromptInputWithActions />
        </div>
      </div>

      {/* Right Sidebar */}
      <div
        className={`
    fixed lg:static top-0 right-0 h-full
    w-[85%] max-w-sm lg:w-80
    overflow-y-auto border-l
    bg-gray-50 border-gray-200
    dark:bg-gray-900 dark:border-gray-700
    transform transition-transform duration-300 z-20
    ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}
    lg:translate-x-0
  `}
      >
        {/* Close button (mobile + tablet) */}
        <div className="sticky top-0 bg-gray-50 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-700 flex justify-end lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-lg border bg-gray-100 dark:bg-gray-800"
          >
            <X className="mt-12 w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6">
          <PromptKitDemo onInteraction={handlePromptKitInteraction} />

          {/* Recent Interactions */}
          {interactions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Recent Interactions
              </h3>
              <div className="space-y-2">
                {interactions.slice(-3).map((interaction, index) => (
                  <div
                    key={index}
                    className="text-xs p-3 rounded-lg border 
                         bg-gray-100 border-gray-200 text-gray-800
                         dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                  >
                    <div className="font-medium mb-1">{interaction.type}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(true)}
        className="absolute top-4 right-4 p-2 rounded-lg border bg-gray-100 dark:bg-gray-800 lg:hidden z-30"
      >
        <PanelRight className="w-5 h-5" />
      </button>
    </div>
  );
};
