
'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useChat } from "ai/react";
import Recorder from "./recorder";
import { Button } from "@/components/ui/button";
import { Camera, Mic } from "lucide-react";

interface Message {
  role: string;
  content: string;
}

const Chat: React.FC = () => {
  const [isCameraSharing, setIsCameraSharing] = useState<boolean>(false);
  const [isInterviewerSpeaking, setIsInterviewerSpeaking] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { messages, handleSubmit, setInput, input } = useChat({
    onFinish: async (message: Message) => {
      if (message.role !== "user") {
        await handleTextToVoice(message.content);
      }
    },
  });

  const handleTextToVoice = async (content: string): Promise<void> => {
    setIsInterviewerSpeaking(true);
    try {
      const response = await fetch('/api/deepgram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!response.ok) throw new Error('Deepgram error');
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audio.play();
      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsInterviewerSpeaking(false);
      };
    } catch (error) {
      console.error('Error fetching audio:', error);
      setIsInterviewerSpeaking(false);
    }
  };

  const handleCameraSharing = async (): Promise<void> => {
    if (isCameraSharing) {
      stopCameraSharing();
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
        setIsCameraSharing(true);
      } catch (error) {
        console.error("Error accessing camera: ", error);
      }
    }
  };

  const stopCameraSharing = (): void => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraSharing(false);
  };

  useEffect(() => {
    if (input) {
      handleSubmit(new Event('submit') as unknown as React.FormEvent<HTMLFormElement>);
    }
  }, [input, handleSubmit]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-900 to-indigo-950 text-white p-4">
      <div className="w-full max-w-md relative mb-4">
        {isCameraSharing ? (
          <video
            ref={videoRef}
            autoPlay
            className="w-full h-auto rounded-2xl shadow-lg border-4 border-blue-600"
          />
        ) : (
          <div className="aspect-video bg-blue-950 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Camera size={48} className="mx-auto mb-2" />
              <p>Camera not active</p>
            </div>
          </div>
        )}
        <Button
          onClick={handleCameraSharing}
          className="absolute bottom-4 right-4 bg-blue-700 hover:bg-blue-800 text-white rounded-full p-3 transition-colors duration-200"
        >
          <Camera size={24} />
        </Button>
      </div>
      
      <div className="w-full max-w-md">
        <div className={`mb-4 p-4 rounded-lg ${isInterviewerSpeaking ? 'bg-green-600' : 'bg-blue-800'} text-center`}>
          {isInterviewerSpeaking ? 'Interviewer is speaking...' : 'Ready for your input'}
        </div>
        <Recorder
          recordingCompleted={(input: string) => {
            setInput(input);
          }}
        />
      </div>
    </div>
  );
};

export default Chat;