'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Loader } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface Message {
  type: 'user' | 'bot';
  content: string;
  image?: string;
}

const AccessibleTravelGuide: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            setImage(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });

  const handleImageAnalysis = async () => {
    if (!image) {
      setMessages(prev => [...prev, { type: 'bot', content: 'Please upload an image first.' }]);
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append('image', blob, 'image.png');

    try {
      const res = await fetch('/api/accessible-guide-helper', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setMessages(prev => [...prev, { type: 'bot', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'An error occurred while analyzing the image.' }]);
    } finally {
      setIsLoading(false);
      setImage(null);
    }
  };

  const handleAskQuestion = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/accessible-guide-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: inputMessage }] }),
      });

      if (!res.ok) throw new Error('Network response was not ok');
      const { response } = await res.json();
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', content: 'An error occurred while processing your question.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputMessage.trim() && !image) return;

    if (image) {
      setMessages(prev => [...prev, { type: 'user', content: 'Analyze this image', image }]);
      await handleImageAnalysis();
    } else {
      setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);
      await handleAskQuestion();
    }

    setInputMessage('');
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#F5D0A9] text-[#000000]">
      <div className="flex-1 flex flex-col">
        <div className="bg-[#4FD1C5] p-4 flex items-center">
          <img src="/placeholder-avatar.jpg" alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
          <div>
            <h2 className="text-xl font-bold text-[#FFFFFF]">Accessible Travel Guide</h2>
            <p className="text-sm text-[#000000]">Your personalized travel assistance</p>
          </div>
          <Button className="ml-auto bg-[#FFFFFF] text-[#000000] p-2 rounded-full">
            <Plus size={24} />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={chatContainerRef}>
          {messages.map((message, index) => (
            <Card key={index} className={`max-w-xs lg:max-w-md xl:max-w-lg ${message.type === 'user' ? 'ml-auto bg-[#4FD1C5]' : 'mr-auto bg-[#FFFFFF]'}`}>
              <CardContent className="p-3">
                {message.image && <img src={message.image} alt="Uploaded" className="mb-2 rounded" />}
                <p className={message.type === 'user' ? 'text-[#FFFFFF]' : 'text-[#000000]'}>{message.content}</p>
              </CardContent>
            </Card>
          ))}
          {isLoading && (
            <Card className="mr-auto bg-[#FFFFFF]">
              <CardContent className="p-3 flex items-center">
                <Loader className="animate-spin mr-2" size={20} />
                <p>Analyzing...</p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex items-center space-x-2">
            <Input
              type="text"
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
              placeholder="Ask about travel options or upload an image..."
              className="flex-1 bg-[#FFFFFF] text-[#000000] rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#4FD1C5]"
            />
            <Button
              type="submit"
              className="bg-[#4FD1C5] text-[#FFFFFF] p-2 rounded-full hover:bg-[#3FC1B5] transition duration-200"
              disabled={isLoading}
            >
              <Send size={24} />
            </Button>
          </form>
          {image && (
            <div className="mt-2">
              <img src={image} alt="Uploaded" className="h-20 rounded" />
            </div>
          )}
          <div {...getRootProps()} className="mt-4 p-4 border-dashed border-2 border-[#4FD1C5] rounded-lg text-center cursor-pointer">
            <input {...getInputProps()} />
            <p className="text-sm text-[#000000]">Drag & drop an image here, or click to select</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibleTravelGuide;