// components/PromptKitDemo.tsx
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageSquare, Zap, Activity } from 'lucide-react';

interface PromptKitDemoProps {
  onInteraction: (type: string, data: unknown) => void;
}

export const PromptKitDemo: React.FC<PromptKitDemoProps> = ({ onInteraction }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  // Simulate prompt-kit functionality
  const simulatePromptKit = async (action: string) => {
    setIsLoading(true);
    setLastAction(action);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = {
      action,
      timestamp: new Date().toISOString(),
      success: true,
      data: {
        message: `Action "${action}" executed successfully!`,
        confidence: Math.floor(Math.random() * 30) + 70
      }
    };
    
    onInteraction(action, result);
    setIsLoading(false);
    
    // Clear last action after 3 seconds
    setTimeout(() => setLastAction(null), 3000);
  };

  const handleQuickPrompt = () => {
    simulatePromptKit('Emotion Analysis');
  };

  const handleInteractivePrompt = () => {
    simulatePromptKit('Interactive Enhancement');
  };

  const handleAdvancedPrompt = () => {
    simulatePromptKit('Advanced Prediction');
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-gray-100 text-sm">
            <Sparkles className="w-4 h-4 text-purple-400" />
            Prompt-Kit Integration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-gray-400">
            Interactive UI library demonstration with real-time emotion processing.
          </p>
          
          <div className="space-y-2">
            <Button
              onClick={handleQuickPrompt}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600 hover:border-gray-500 text-xs h-8"
            >
              <MessageSquare className="w-3 h-3 mr-2" />
              Quick Analysis
            </Button>
            
            <Button
              onClick={handleInteractivePrompt}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600 hover:border-gray-500 text-xs h-8"
            >
              <Zap className="w-3 h-3 mr-2" />
              Interactive Mode
            </Button>
            
            <Button
              onClick={handleAdvancedPrompt}
              disabled={isLoading}
              variant="outline"
              size="sm"
              className="w-full justify-start bg-gray-700 border-gray-600 text-gray-100 hover:bg-gray-600 hover:border-gray-500 text-xs h-8"
            >
              <Activity className="w-3 h-3 mr-2" />
              Advanced Features
            </Button>
          </div>

          {isLoading && (
            <div className="flex items-center gap-2 p-2 bg-gray-700 rounded border border-gray-600">
              <div className="animate-spin rounded-full h-3 w-3 border-2 border-purple-400 border-t-transparent"></div>
              <span className="text-xs text-gray-300">
                Processing...
              </span>
            </div>
          )}

          {lastAction && !isLoading && (
            <div className="p-2 bg-gray-700 rounded border border-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-xs text-gray-300 font-medium">
                  {lastAction} completed!
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Technology Stack Card */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-gray-100 text-sm">Tech Stack</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Framework</span>
            <span className="text-gray-200 font-medium">Next.js 14+</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Language</span>
            <span className="text-gray-200 font-medium">TypeScript</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">UI Library</span>
            <span className="text-gray-200 font-medium">Shadcn/ui</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Styling</span>
            <span className="text-gray-200 font-medium">Tailwind v4</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400">Special</span>
            <span className="text-gray-200 font-medium">Prompt-kit</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};