import Chat from "@/components/chat";
import React from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

const Page = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};

export default Page;
