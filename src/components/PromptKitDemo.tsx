// components/PromptKitDemo.tsx
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, MessageSquare, Zap } from 'lucide-react';

// Note: In a real implementation, you would import from 'prompt-kit'
// For this demo, we'll create a simple simulation of prompt-kit functionality
// import { usePrompt } from 'prompt-kit';


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
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
    simulatePromptKit('Quick Emotion Analysis');
  };

  const handleInteractivePrompt = () => {
    simulatePromptKit('Interactive Chat Enhancement');
  };

  const handleAdvancedPrompt = () => {
    simulatePromptKit('Advanced Emotion Prediction');
  };

  return (
    <Card className="w-full bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
          <Sparkles className="w-5 h-5" />
          Prompt-Kit Integration Demo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Demonstration of prompt-kit library integration for enhanced user interactions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Button
            onClick={handleQuickPrompt}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2 h-auto p-3 flex-col text-center hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs">Quick Analysis</span>
          </Button>
          
          <Button
            onClick={handleInteractivePrompt}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2 h-auto p-3 flex-col text-center hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Zap className="w-4 h-4" />
            <span className="text-xs">Interactive Mode</span>
          </Button>
          
          <Button
            onClick={handleAdvancedPrompt}
            disabled={isLoading}
            variant="outline"
            className="flex items-center gap-2 h-auto p-3 flex-col text-center hover:bg-purple-50 dark:hover:bg-purple-900/20"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-xs">Advanced Features</span>
          </Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center gap-2 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent"></div>
            <span className="text-sm text-purple-700 dark:text-purple-300">
              Processing {lastAction}...
            </span>
          </div>
        )}

        {lastAction && !isLoading && (
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                {lastAction} completed successfully!
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
