import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import ChatMessage from "./chat-message";
import { Message } from "ai";

interface Props {
  messages: Message[];
}

const ChatMessages = ({ messages }: Props) => {
  return (
    <div
      className={
        "flex-1 flex h-full overflow-y-auto scroll-smooth flex-col gap-2 shadow-inner p-4 shadow-blue-600 rounded-xl" +
        ""
      }
    >
      {messages.map((msg, i) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          index={i}
          len={messages.length - 1}
        />
      ))}
    </div>
  );
};

export default ChatMessages;