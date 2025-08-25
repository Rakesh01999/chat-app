// components/ChatMessage.tsx
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
          <div key={index} className="bg-gray-800 rounded-lg p-4 my-3 border border-gray-700">
            <pre className="overflow-x-auto">
              <code className="text-sm font-mono text-gray-100 leading-relaxed">
                {code}
              </code>
            </pre>
          </div>
        );
      }
      // Regular text
      return (
        <span key={index} className="whitespace-pre-wrap leading-relaxed">
          {part}
        </span>
      );
    });
  };

  return (
    <div className={`flex gap-4 ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <Avatar className="w-8 h-8 mt-1 flex-shrink-0">
        <AvatarFallback className={`${
          isUser 
            ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
            : 'bg-blue-500 text-white'
        } text-xs`}>
          {isUser ? <User size={14} /> : <Bot size={14} />}
        </AvatarFallback>
      </Avatar>

      {/* Message Content */}
      <div className={`flex-1 max-w-[70%] ${isUser ? 'text-right' : ''}`}>
        {/* Message Bubble */}
        <div className={`${
          isUser 
            ? 'bg-gray-600 text-gray-100 ml-auto' 
            : 'bg-gray-750 text-gray-100'
        } rounded-2xl p-4 shadow-sm border border-gray-600`}>
          <div className="text-sm">
            {formatContent(message.content)}
          </div>
        </div>

        {/* Emotions */}
        <div className={`flex flex-wrap gap-2 mt-3 ${isUser ? 'justify-end' : ''}`}>
          {message.emotions.map((emotion, index) => (
            <div key={index} className="flex items-center text-xs text-gray-400">
              <span className="mr-2">{emotion.label}</span>
              <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden min-w-16">
                <div 
                  className={`h-full transition-all duration-300 ${
                    emotion.confidence > 80 ? 'bg-blue-400' :
                    emotion.confidence > 60 ? 'bg-green-400' : 
                    'bg-purple-400'
                  }`}
                  style={{ width: `${emotion.confidence}%` }}
                />
              </div>
              <span className="ml-2 font-mono">{emotion.confidence.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};