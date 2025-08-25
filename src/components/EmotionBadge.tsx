
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Emotion } from "@/lib/types";

interface EmotionBadgeProps {
  emotion: Emotion;
}

const getEmotionColor = (label: string, confidence: number): string => {
  const intensity = confidence > 80 ? 'high' : confidence > 60 ? 'medium' : 'low';
  
  const colorMap: Record<string, Record<string, string>> = {
    Frustration: {
      high: 'bg-red-100 text-red-800 border-red-200',
      medium: 'bg-red-50 text-red-600 border-red-100',
      low: 'bg-red-25 text-red-500 border-red-75'
    },
    Curiosity: {
      high: 'bg-purple-100 text-purple-800 border-purple-200',
      medium: 'bg-purple-50 text-purple-600 border-purple-100',
      low: 'bg-purple-25 text-purple-500 border-purple-75'
    },
    Determination: {
      high: 'bg-orange-100 text-orange-800 border-orange-200',
      medium: 'bg-orange-50 text-orange-600 border-orange-100',
      low: 'bg-orange-25 text-orange-500 border-orange-75'
    },
    Helpfulness: {
      high: 'bg-green-100 text-green-800 border-green-200',
      medium: 'bg-green-50 text-green-600 border-green-100',
      low: 'bg-green-25 text-green-500 border-green-75'
    },
    Enthusiasm: {
      high: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      medium: 'bg-yellow-50 text-yellow-600 border-yellow-100',
      low: 'bg-yellow-25 text-yellow-500 border-yellow-75'
    },
    Patience: {
      high: 'bg-teal-100 text-teal-800 border-teal-200',
      medium: 'bg-teal-50 text-teal-600 border-teal-100',
      low: 'bg-teal-25 text-teal-500 border-teal-75'
    },
    Confusion: {
      high: 'bg-gray-100 text-gray-800 border-gray-200',
      medium: 'bg-gray-50 text-gray-600 border-gray-100',
      low: 'bg-gray-25 text-gray-500 border-gray-75'
    },
    Thoughtfulness: {
      high: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      medium: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      low: 'bg-indigo-25 text-indigo-500 border-indigo-75'
    },
    Eagerness: {
      high: 'bg-pink-100 text-pink-800 border-pink-200',
      medium: 'bg-pink-50 text-pink-600 border-pink-100',
      low: 'bg-pink-25 text-pink-500 border-pink-75'
    },
    Confidence: {
      high: 'bg-blue-100 text-blue-800 border-blue-200',
      medium: 'bg-blue-50 text-blue-600 border-blue-100',
      low: 'bg-blue-25 text-blue-500 border-blue-75'
    },
    Clarity: {
      high: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      medium: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      low: 'bg-cyan-25 text-cyan-500 border-cyan-75'
    },
    Supportiveness: {
      high: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      medium: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      low: 'bg-emerald-25 text-emerald-500 border-emerald-75'
    },
    Understanding: {
      high: 'bg-lime-100 text-lime-800 border-lime-200',
      medium: 'bg-lime-50 text-lime-600 border-lime-100',
      low: 'bg-lime-25 text-lime-500 border-lime-75'
    },
    Excitement: {
      high: 'bg-rose-100 text-rose-800 border-rose-200',
      medium: 'bg-rose-50 text-rose-600 border-rose-100',
      low: 'bg-rose-25 text-rose-500 border-rose-75'
    },
    Expertise: {
      high: 'bg-violet-100 text-violet-800 border-violet-200',
      medium: 'bg-violet-50 text-violet-600 border-violet-100',
      low: 'bg-violet-25 text-violet-500 border-violet-75'
    },
    Satisfaction: {
      high: 'bg-amber-100 text-amber-800 border-amber-200',
      medium: 'bg-amber-50 text-amber-600 border-amber-100',
      low: 'bg-amber-25 text-amber-500 border-amber-75'
    }
  };

  return colorMap[label]?.[intensity] || 'bg-gray-100 text-gray-800 border-gray-200';
};

export const EmotionBadge: React.FC<EmotionBadgeProps> = ({ emotion }) => {
  const colorClass = getEmotionColor(emotion.label, emotion.confidence);
  
  return (
    <Badge 
      variant="outline" 
      className={`${colorClass} text-xs font-medium px-2 py-1 rounded-full transition-all duration-200 hover:scale-105`}
    >
      {emotion.label} {emotion.confidence}%
    </Badge>
  );
};
