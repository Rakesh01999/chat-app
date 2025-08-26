// components/ChatInterface.tsx - Dual Mode (Light + Dark)
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage } from './ChatMessage';
import { PromptKitDemo } from './PromptKitDemo';
import { messages } from '@/data/messages';
import { MessageSquare, Brain, Activity } from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const [interactions, setInteractions] = useState<Array<{type: string, data: unknown}>>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptKitInteraction = (type: string, data: unknown) => {
    setInteractions(prev => [...prev, { type, data }]);
  };

  const totalEmotions = messages.reduce((acc, msg) => acc + msg.emotions.length, 0);
  const averageConfidence = Math.round(
    messages.reduce((acc, msg) => 
      acc + msg.emotions.reduce((sum, emotion) => sum + emotion.confidence, 0), 0
    ) / totalEmotions
  );

  return (
    <div className="
      h-full flex
      bg-white text-gray-900 border-gray-200
      dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700
    ">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        
        {/* Chat Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-1">React State Management Discussion</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">AI Assistant helping with coding questions</p>
            </div>
            
            {/* Live emotion indicators */}
            <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-400 rounded-full mr-2"></div>
                Frustration 75.00
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Curiosity 65.00
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                Determination 58.00
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="flex items-center p-4">
                <MessageSquare className="w-6 h-6 text-blue-500 dark:text-blue-400 mr-3" />
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Messages</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{messages.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="flex items-center p-4">
                <Brain className="w-6 h-6 text-purple-500 dark:text-purple-400 mr-3" />
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Emotions Detected</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{totalEmotions}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <CardContent className="flex items-center p-4">
                <Activity className="w-6 h-6 text-green-500 dark:text-green-400 mr-3" />
                <div>
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Avg Confidence</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{averageConfidence}%</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="p-6 space-y-6">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Right Sidebar - Prompt Kit Demo */}
      <div className="
        w-80 p-6 overflow-y-auto border-l
        bg-gray-50 border-gray-200
        dark:bg-gray-900 dark:border-gray-700
      ">
        <PromptKitDemo onInteraction={handlePromptKitInteraction} />
        
        {/* Recent Interactions */}
        {interactions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Recent Interactions</h3>
            <div className="space-y-2">
              {interactions.slice(-3).map((interaction, index) => (
                <div 
                  key={index} 
                  className="text-xs p-3 rounded-lg border 
                             bg-gray-100 border-gray-200 text-gray-800
                             dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
                >
                  <div className="font-medium mb-1">{interaction.type}</div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {/* Confidence or other data */}
                  </div>
                  <div className="text-gray-400 dark:text-gray-500 text-xs mt-1">
                    {/* {new Date(interaction.data.timestamp).toLocaleTimeString()} */}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
