// components/ChatInterface.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from './ChatMessage';
import { PromptKitDemo } from './PromptKitDemo';
import { messages } from '@/data/messages';
import { Moon, Sun, Copy, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const ChatInterface: React.FC = () => {
  const [interactions, setInteractions] = useState<Array<{type: string, data: unknown}>>([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set dark mode on document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptKitInteraction = (type: string, data: unknown) => {
    setInteractions(prev => [...prev, { type, data }]);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-16' : 'w-16'} bg-gray-800 flex flex-col items-center py-4 space-y-6 transition-all duration-300`}>
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-sm"></div>
        </div>
        
        <nav className="flex flex-col space-y-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
            <Copy size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors">
            <Menu size={16} />
          </button>
        </nav>
        
        <div className="flex-1"></div>
        
        <div className="flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-8 h-8 p-0 hover:bg-gray-700"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </Button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xs font-semibold">U</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-gray-700 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-semibold text-gray-100">React State Management Chat</h1>
              <p className="text-xs text-gray-400">AI Assistant helping with coding questions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <span>Frustration 75.00</span>
              <span>Curiosity 65.00</span>
              <span>Determination 58.00</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex">
          {/* Messages */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1" ref={scrollAreaRef}>
              <div className="p-6 space-y-6">
                {messages.map((message, index) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right Sidebar - Prompt Kit Demo */}
          <div className="w-80 bg-gray-850 border-l border-gray-700 p-4">
            <PromptKitDemo onInteraction={handlePromptKitInteraction} />
            
            {/* Recent Interactions */}
            {interactions.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Recent Interactions</h3>
                <div className="space-y-2">
                  {interactions.slice(-3).map((interaction, index) => (
                    <div key={index} className="text-xs p-2 bg-gray-800 rounded border border-gray-700">
                      <div className="font-medium text-gray-100">
                        {interaction.type}
                      </div>
                      <div className="text-gray-400">
                        {/* Confidence: {interaction.data.data?.confidence}% */}
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
  );
};