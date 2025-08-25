"use client";

import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChatMessage } from "./ChatMessage";
import { PromptKitDemo } from "./PromptKitDemo";
import { messages } from "@/data/messages";
import { MessageSquare, Brain, Activity } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const [interactions, setInteractions] = useState<
    Array<{ type: string; data: unknown }>
  >([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handlePromptKitInteraction = (type: string, data: unknown) => {
    setInteractions((prev) => [...prev, { type, data }]);
  };

  const totalEmotions = messages.reduce(
    (acc, msg) => acc + msg.emotions.length,
    0
  );
  const averageConfidence = Math.round(
    messages.reduce(
      (acc, msg) =>
        acc +
        msg.emotions.reduce((sum, emotion) => sum + emotion.confidence, 0),
      0
    ) / totalEmotions
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            AI Emotion Chat Interface
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A Next.js application showcasing emotion analysis in conversations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="flex items-center p-4">
              <MessageSquare className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Messages
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {messages.length}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <Brain className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Emotions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalEmotions}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-4">
              <Activity className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Confidence
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {averageConfidence}%
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat Messages */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  React State Management Conversation
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                  <div className="px-4">
                    {messages.map((message, index) => (
                      <div key={message.id}>
                        <ChatMessage message={message} />
                        {index < messages.length - 1 && (
                          <Separator className="my-2" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prompt-Kit Integration */}
            <PromptKitDemo onInteraction={handlePromptKitInteraction} />

            {/* Recent Interactions */}
            {interactions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">
                    Recent Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {interactions.slice(-3).map((interaction, index) => (
                    <div
                      key={index}
                      className="text-xs p-2 bg-gray-50 dark:bg-gray-800 rounded"
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {interaction.type}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {/* Confidence: {interaction.data.data?.confidence}% */}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Technology Stack */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">
                  Tech Stack
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Framework
                  </span>
                  <span className="font-medium">Next.js 14+</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Language
                  </span>
                  <span className="font-medium">TypeScript</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    UI Library
                  </span>
                  <span className="font-medium">Shadcn/ui</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Styling
                  </span>
                  <span className="font-medium">Tailwind CSS</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Special
                  </span>
                  <span className="font-medium">Prompt-kit</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

