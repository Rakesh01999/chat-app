"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";

export function PromptInputWithActions() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    if (input.trim() || files.length > 0) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setInput("");
        setFiles([]);
      }, 2000);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return; 

    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef.current) uploadInputRef.current.value = "";
  };

  return (
    // <div className="w-full max-w-md border rounded-lg p-4 flex flex-col gap-2">
    <div className="w-full border rounded-lg p-4 flex flex-col gap-2">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {files.map((file, i) => (
            <div
              key={i}
              className="bg-gray-200 dark:bg-gray-800 flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Paperclip className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(i)}
                className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <textarea
        className="border rounded-md p-2 w-full resize-none"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-between items-center gap-2 pt-2">
        <label className="p-2 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            ref={uploadInputRef}
          />
          <Paperclip className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        </label>

        <Button onClick={handleSubmit} className="h-8 w-8 rounded-full p-0">
          {isLoading ? (
            <Square className="w-5 h-5" />
          ) : (
            <ArrowUp className="w-5 h-5" />
          )}
        </Button>
      </div>
    </div>
  );
}
