import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription } from "@/components/ui/card";
import { AudioWaveform, Mic, Pause, Play } from "lucide-react";

type Props = {
  recordingCompleted: (input: string) => void;
};

const Recorder: React.FC<Props> = ({ recordingCompleted }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isRecordingComplete, setIsRecordingComplete] = useState<boolean>(true);
  const [transcript, setTranscript] = useState<string>("");
  const [fullTranscript, setFullTranscript] = useState<string>("");

  const recordRef = useRef<any | null>(null);

  useEffect(() => {
    if (recordRef.current) {
      recordRef.current.stop();
      stopRecording();
    }
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    setIsRecordingComplete(false);
    recordRef.current = new (window as any).webkitSpeechRecognition();
    recordRef.current.continuous = true;
    recordRef.current.interimResults = true;

    recordRef.current.onresult = (e: any) => {
      let interimTranscript = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          setFullTranscript((prev) => prev + e.results[i][0].transcript);
        } else {
          interimTranscript += e.results[i][0].transcript;
        }
      }
      setTranscript(interimTranscript);
    };

    recordRef.current.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    setIsRecordingComplete(true);
    setTranscript("");
  };

  const toggleRecording = () => {
    if (!recordRef.current) return;
    if (isRecording) {
      recordRef.current.stop();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      recordRef.current.start();
    }
  };

  const handleRecordingComplete = () => {
    if (!recordRef.current) return;

    recordRef.current.stop();

    if (fullTranscript) {
      recordingCompleted(fullTranscript);
      setFullTranscript("");
    }

    stopRecording();
  };

  return (
    <div className="text-center flex flex-row justify-center items-center gap-2">
      <Card className="p-2 scroll-smooth max-w-full text-nowrap overflow-x-scroll w-[350px] bg-blue-900 border-blue-700">
        <CardDescription className="w-full text-blue-200">
          {!isRecording && isRecordingComplete
            ? "Tap on mic to begin your interview!"
            : transcript
            ? transcript
            : "Listening..."}
        </CardDescription>
      </Card>
      <div className="text-center flex flex-row gap-2 justify-center items-center">
        {!isRecording && isRecordingComplete ? (
          <Button
            onClick={startRecording}
            className="bg-blue-700 hover:bg-blue-600 flex flex-col text-white relative w-[40px] h-[40px] shadow-sm rounded-full"
          >
            <Mic
              size={25}
              className={`${isRecording ? "opacity-0 !important" : "opacity-100"}`}
            />
          </Button>
        ) : (
          <>
            <Button
              onClick={handleRecordingComplete}
              className="bg-blue-700 hover:bg-blue-600 flex flex-col text-white w-[40px] h-[40px] shadow-sm rounded-full"
            >
              <AudioWaveform
                size={25}
                className={`${
                  !isRecordingComplete ? "opacity-100 " : "opacity-0"
                } ${isRecording ? "animate-pulse" : ""}`}
              />
            </Button>
            <Button 
              className="bg-blue-700 hover:bg-blue-600 relative w-[40px] h-[40px] rounded-full" 
              onClick={toggleRecording}
            >
              <Play
                size={25}
                className={`text-white ${
                  isRecording ? "opacity-0" : "opacity-100"
                } transition-all`}
              />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Recorder;
