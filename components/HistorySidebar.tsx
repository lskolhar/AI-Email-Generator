"use client";

import { Clock3 } from "lucide-react";

import { EmailHistoryItem } from "@/types/history";

interface HistorySidebarProps {
  history: EmailHistoryItem[];
  onSelect: (item: EmailHistoryItem) => void;
}

export default function HistorySidebar({
  history,
  onSelect,
}: HistorySidebarProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-lg min-h-full">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-5">
        <Clock3 className="text-blue-400" size={22} />

        <h2 className="text-xl font-semibold">
          Email History
        </h2>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="flex items-center justify-center h-[200px] text-center">
            <p className="text-gray-400 text-sm leading-6">
              No emails generated yet.
              <br />
              Your history will appear here.
            </p>
          </div>
        ) : (
          history.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item)}
              className="w-full text-left bg-black/20 hover:bg-black/40 hover:scale-[1.02] transition-all duration-300 rounded-xl p-4 border border-transparent hover:border-blue-500/30"
            >
              {/* Subject */}
              <p className="font-medium truncate mb-1">
                {item.subject}
              </p>

              {/* Prompt */}
              <p className="text-sm text-gray-400 truncate">
                {item.prompt}
              </p>

              {/* Tone */}
              <div className="mt-3">
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                  {item.tone}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}