// components/Sidebar.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  MessageSquare,
  Brain,
  Activity,
  Settings,
  History,
  Users,
  BarChart3,
  Sparkles,
  ChevronLeft,
  Plus,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

const sidebarItems = [
  {
    title: "Conversations",
    icon: MessageSquare,
    badge: "6",
    isActive: true,
  },
  {
    title: "Emotion Analysis",
    icon: Brain,
    badge: null,
    isActive: false,
  },
  {
    title: "Analytics",
    icon: BarChart3,
    badge: null,
    isActive: false,
  },
  {
    title: "History",
    icon: History,
    badge: "24",
    isActive: false,
  },
  {
    title: "Team",
    icon: Users,
    badge: null,
    isActive: false,
  },
  {
    title: "Prompt Kit",
    icon: Sparkles,
    badge: "New",
    isActive: false,
  },
];

const recentConversations = [
  {
    id: 1,
    title: "React State Management",
    lastMessage: "Great question! For multiple...",
    time: "2m ago",
    unread: 2,
  },
  {
    id: 2,
    title: "TypeScript Interfaces",
    lastMessage: "Here's how you can define...",
    time: "1h ago",
    unread: 0,
  },
  {
    id: 3,
    title: "Next.js Routing",
    lastMessage: "App Router is the new way...",
    time: "3h ago",
    unread: 1,
  },
  {
    id: 4,
    title: "CSS Grid Layout",
    lastMessage: "Grid is perfect for this...",
    time: "1d ago",
    unread: 0,
  },
  {
    id: 5,
    title: "API Integration",
    lastMessage: "You can use fetch or...",
    time: "2d ago",
    unread: 0,
  },
];

const SidebarContent: React.FC<{ isOpen: boolean; onToggle?: () => void }> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col border-r",
        "bg-white text-gray-900 border-gray-200", // Light mode
        "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700", // Dark mode
        isOpen ? "w-80" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex h-14 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
        {isOpen && (
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
              <MessageSquare className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-sm">AI Assistant</span>
          </div>
        )}
        {onToggle && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="h-8 w-8 p-0 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform",
                !isOpen && "rotate-180"
              )}
            />
          </Button>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4">
        <Button
          className={cn(
            "bg-blue-600 hover:bg-blue-700 text-white",
            isOpen ? "w-full justify-start" : "w-8 h-8 p-0 justify-center"
          )}
        >
          <Plus className="w-4 h-4" />
          {isOpen && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Navigation */}
      <div className="px-4 pb-4">
        {isOpen && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-md border focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent
                         bg-gray-100 text-gray-900 placeholder-gray-500 border-gray-300
                         dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:border-gray-700"
            />
          </div>
        )}

        <nav className="space-y-1">
          {sidebarItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={cn(
                "transition-colors",
                "text-gray-700 hover:bg-gray-100 hover:text-gray-900", // Light
                "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white", // Dark
                item.isActive &&
                  "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white",
                isOpen
                  ? "w-full justify-start h-9"
                  : "w-8 h-8 p-0 justify-center"
              )}
            >
              <item.icon className="w-4 h-4" />
              {isOpen && (
                <>
                  <span className="ml-3 text-sm">{item.title}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto text-xs px-1.5 py-0
                                 bg-gray-200 text-gray-700
                                 dark:bg-gray-700 dark:text-gray-300"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          ))}
        </nav>
      </div>

      {isOpen && (
        <>
          <Separator className="bg-gray-200 dark:bg-gray-700" />

          {/* Recent Conversations */}
          <div className="flex-1 px-4 py-4">
            <h3 className="mb-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Recent Conversations
            </h3>
            <ScrollArea className="h-full">
              <div className="space-y-2">
                {recentConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="group cursor-pointer rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {conversation.title}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                          {conversation.time}
                        </p>
                      </div>
                      {conversation.unread > 0 && (
                        <Badge
                          variant="default"
                          className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0 rounded-full"
                        >
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </>
      )}

      {/* Settings */}
      <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className={cn(
            "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            "dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white",
            isOpen ? "w-full justify-start h-9" : "w-8 h-8 p-0 justify-center"
          )}
        >
          <Settings className="w-4 h-4" />
          {isOpen && <span className="ml-3 text-sm">Settings</span>}
        </Button>
      </div>
    </div>
  );
};

// Desktop Sidebar
export const DesktopSidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
}) => {
  return (
    <div className="hidden md:flex">
      <SidebarContent isOpen={isOpen} onToggle={onToggle} />
    </div>
  );
};

// Mobile Sidebar (Sheet)
export const MobileSidebar: React.FC<{
  isOpen: boolean;
  onToggle: () => void;
}> = ({ isOpen, onToggle }) => {
  return (
    <Sheet open={isOpen} onOpenChange={onToggle}>
      <SheetContent
        side="left"
        className="p-0 w-80 bg-gray-900 border-gray-700"
      >
        <VisuallyHidden>
          <SheetTitle>Sidebar</SheetTitle>
        </VisuallyHidden>
        <SidebarContent isOpen={true} />
      </SheetContent>
    </Sheet>
  );
};

// Combined Sidebar Component
export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onToggle,
  isMobile,
}) => {
  if (isMobile) {
    return <MobileSidebar isOpen={isOpen} onToggle={onToggle} />;
  }

  return <DesktopSidebar isOpen={isOpen} onToggle={onToggle} />;
};
