
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { EmotionBadge } from './EmotionBadge';
import { ChatMessage as ChatMessageType } from '@/lib/types';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Format code blocks in the content
  const formatContent = (content: string) => {
    const parts = content.split('```');
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a code block
        const lines = part.split('\n');
        const language = lines[0];
        const code = lines.slice(1).join('\n');
        return (
          <pre key={index} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 my-2 overflow-x-auto">
            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
              {code}
            </code>
          </pre>
        );
      }
      // Regular text
      return (
        <span key={index} className="whitespace-pre-wrap">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={`flex gap-3 p-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <Avatar className="w-8 h-8 mt-1">
        <AvatarFallback className={`${isUser ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
          {isUser ? <User size={16} /> : <Bot size={16} />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={`flex-1 max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        {/* Message Bubble */}
        <Card className={`${
          isUser 
            ? 'bg-blue-500 text-white border-blue-500' 
            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        } shadow-sm`}>
          <CardContent className="p-3">
            <div className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-gray-800 dark:text-gray-200'}`}>
              {formatContent(message.content)}
            </div>
          </CardContent>
        </Card>

        {/* Emotions */}
        <div className={`flex flex-wrap gap-1 mt-2 ${isUser ? 'justify-end' : ''}`}>
          {message.emotions.map((emotion, index) => (
            <EmotionBadge key={index} emotion={emotion} />
          ))}
        </div>
      </div>
    </div>
  );
};
