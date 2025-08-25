'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { PromptKitDemo } from './PromptKitDemo';
import { messages } from '@/data/messages';
import { Moon, Sun, Copy, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatInterface: React.FC = () => {
  const [interactions, setInteractions] = useState<Array<{type: string, data: unknown}>>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightbarOpen, setRightbarOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptKitInteraction = (type: string, data: unknown) => {
    setInteractions(prev => [...prev, { type, data }]);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar (collapsible on mobile) */}
      <div className={`${sidebarOpen ? "w-56" : "w-16"} hidden sm:flex flex-col bg-gray-100 dark:bg-gray-800 transition-all duration-300`}>
        <div className="flex flex-col items-center py-4 space-y-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>

          <nav className="flex flex-col space-y-4">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              <Copy size={16} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Menu size={16} />
            </button>
          </nav>

          <div className="flex-1"></div>

          <div className="flex flex-col space-y-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </Button>

            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-xs font-semibold">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-3">
            {/* Mobile sidebar toggle */}
            <button className="sm:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold">React State Management Chat</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">AI Assistant helping with coding questions</p>
            </div>
          </div>

          {/* Emotions / stats */}
          <div className="hidden md:flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
            <span>Frustration 75.00</span>
            <span>Curiosity 65.00</span>
            <span>Determination 58.00</span>
          </div>

          {/* Mobile right sidebar toggle */}
          <button className="md:hidden" onClick={() => setRightbarOpen(!rightbarOpen)}>
            {rightbarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex relative">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-4 sm:p-6 space-y-6">
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Sidebar (hidden on mobile, toggleable) */}
          <div className={`absolute md:relative top-0 right-0 h-full w-72 bg-gray-100 dark:bg-gray-850 border-l border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${rightbarOpen ? "translate-x-0" : "translate-x-full"} md:translate-x-0`}>
            <div className="p-4">
              <PromptKitDemo onInteraction={handlePromptKitInteraction} />

              {interactions.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-3">Recent Interactions</h3>
                  <div className="space-y-2">
                    {interactions.slice(-3).map((interaction, index) => (
                      <div key={index} className="text-xs p-2 bg-gray-200 dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700">
                        <div className="font-medium">
                          {interaction.type}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {/* Placeholder for data */}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
