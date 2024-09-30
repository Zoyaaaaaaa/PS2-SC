import React from 'react';
import { Bot, User2 } from "lucide-react";

export const Message = ({ message }: { message: { role: string; content: string } }) => {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex items-end gap-3 mb-4 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className="rounded-full bg-primary p-2 text-white shadow-md">
            <Bot size={20} />
          </div>
        </div>
      )}
      <div className={`max-w-[70%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'} rounded-2xl px-4 py-2 shadow-md`}>
        <p className="text-sm leading-relaxed">{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0">
          <div className="rounded-full bg-primary p-2 text-white shadow-md">
            <User2 size={20} />
          </div>
        </div>
      )}
    </div>
  );
};