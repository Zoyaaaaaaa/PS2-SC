"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Bot, Loader2, User2, Armchair, Ear, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Message } from "./components/message";
import {
  AccessibilityInputType,
  aiMessages,
  accessibilityInputs,
} from "./lib/util";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Trip = {
  destination: string;
  days: number;
  budget: string;
  wheelchair: boolean;
  hearingImpaired: boolean;
  visuallyImpaired: boolean;
};

type TripData = {
  hotels: Array<{
    hotelName: string;
    hotelAddress: string;
    price: string;
    hotelImageUrl: string;
    geoCoordinates: string;
    rating: string;
    description: string;
    accessibilityFeatures: string[];
  }>;
  itinerary: Array<{
    day: string;
    plan: Array<{
      time: string;
      placeName: string;
      placeDetails: string;
      placeImageUrl: string;
      geoCoordinates: string;
      ticketPricing: string;
      timeToTravel: string;
      accessibilityNotes: string;
    }>;
  }>;
};

const Page: React.FC = () => {
  const [formData, setFormData] = useState<Trip>({
    destination: "",
    days: 1,
    budget: "",
    wheelchair: false,
    hearingImpaired: false,
    visuallyImpaired: false,
  });

  const [messages, setMessages] = useState([...aiMessages]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [tripData, setTripData] = useState<TripData | null>(null);

  const [currTripInput, setCurrentTripInput] = useState<{
    index: number;
    name: AccessibilityInputType;
    placeholder: string;
    value: string;
  }>({
    index: 0,
    name: "destination",
    placeholder: "Where would you like to go?",
    value: "",
  });

  const nav = useRouter();

  const handleTripInputChange = (index: number) => {
    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: accessibilityInputs[index].placeholder,
      },
    ]);
    setCurrentTripInput({
      index,
      name: accessibilityInputs[index].input as AccessibilityInputType,
      placeholder: accessibilityInputs[index].placeholder,
      value: String(formData[accessibilityInputs[index].input as keyof Trip]),
    });
  };

  const handleNext = async () => {
    const nextInd = currTripInput.index + 1;
    const nextInput = accessibilityInputs[nextInd];

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: nextInd <= 3 ? nextInput.placeholder : "Generating Trip...",
      },
    ]);

    if (nextInd <= 3) {
      setCurrentTripInput({
        index: nextInd,
        name: nextInput.input as AccessibilityInputType,
        placeholder: nextInput.placeholder,
        value: "",
      });
    } else {
      await generateTrip();
    }
  };

  const generateTrip = async () => {
    console.log("Called ");
    if (!formData.budget || !formData.days || !formData.destination) {
      console.log("hfdsk");
      toast.error("Please fill all the required details");
      return;
    }
    console.log("Backs");
    setIsGenerating(true);

    try {
      console.log("Tyr");
      const response = await fetch("/api/accessible-trip-planner", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination: formData.destination,
          days: Number(formData.days),
          budget: formData.budget,
          wheelchair: formData.wheelchair,
          hearingImpaired: formData.hearingImpaired,
          visuallyImpaired: formData.visuallyImpaired,
        }),
      });
      console.log(response);

      const res = await response.json();

      if (!response.ok) {
        toast.error(
          res.message || "An error occurred while generating the trip."
        );
        return;
      }

      setTripData(res.trip);
      toast.success("Trip generated successfully!");
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("An error occurred while generating the trip.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="mx-auto flex h-screen w-full max-w-7xl flex-col p-6 md:px-24">
      <Card className="flex h-full flex-1 flex-col border-none bg-transparent shadow-sm shadow-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Accessible Trip Planner
          </CardTitle>
          <CardDescription>
            Plan your accessible trip with confidence
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto scroll-smooth">
          {messages.map((msg, i) => (
            <Message key={i} message={msg} />
          ))}
          {isGenerating && (
            <div className="flex flex-col it  ems-center justify-center space-y-4 p-8">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-lg font-semibold">
                Generating your perfect trip...
              </p>
            </div>
          )}
          {tripData && <TripDisplay tripData={tripData} />}
        </CardContent>
        <CardFooter>
          <TripInput
            placeholder={currTripInput.placeholder}
            tripInput={currTripInput.name}
            inputValue={
              formData[currTripInput.name as keyof Trip]
                ? String(formData[currTripInput.name as keyof Trip])
                : ""
            }
            handleChange={(v) =>
              setFormData((prev) => ({ ...prev, [currTripInput.name]: v }))
            }
            handleInput={(index) => handleTripInputChange(index)}
            index={currTripInput.index}
            handleNext={handleNext}
            isGenerating={isGenerating}
            formData={formData}
            setFormData={setFormData}
          />
        </CardFooter>
      </Card>
    </div>
  );
};

interface TripInputProps {
  placeholder: string;
  index: number;
  tripInput: AccessibilityInputType;
  inputValue: string;
  handleChange: (value: string) => void;
  handleInput: (index: number) => void;
  handleNext: () => void;
  isGenerating: boolean;
  formData: Trip;
  setFormData: React.Dispatch<React.SetStateAction<Trip>>;
}

const TripInput: React.FC<TripInputProps> = ({
  placeholder,
  handleChange,
  index,
  handleInput,
  handleNext,
  inputValue,
  isGenerating,
  formData,
  setFormData,
}) => {
  return (
    <div className="flex w-full flex-col items-center gap-2 p-2">
      <TooltipProvider>
        <div className="flex items-center gap-1">
          {accessibilityInputs.map((inp, i) => (
            <Tooltip key={i}>
              <TooltipTrigger
                disabled={isGenerating}
                onClick={() => handleInput(i)}
                className={`${
                  index === i ? "bg-primary-foreground" : "bg-secondary"
                } rounded-full p-3`}
              >
                {<inp.icon size={22} />}
              </TooltipTrigger>
              <TooltipContent className="text-secondary-foreground">
                {inp.input}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
        className="flex w-full flex-col items-center gap-2"
      >
        <Input
          disabled={isGenerating}
          className="w-full"
          type={index === 1 ? "number" : "text"}
          min={index === 1 ? 1 : undefined}
          max={30}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
          placeholder={placeholder}
        />
        <div className="flex w-full justify-between">
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formData.wheelchair}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  wheelchair: checked as boolean,
                }))
              }
            />
            <Armchair size={20} /> Wheelchair Accessible
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formData.hearingImpaired}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  hearingImpaired: checked as boolean,
                }))
              }
            />
            <Ear size={20} /> Hearing Impaired
          </label>
          <label className="flex items-center gap-2">
            <Checkbox
              checked={formData.visuallyImpaired}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  visuallyImpaired: checked as boolean,
                }))
              }
            />
            <Eye size={20} /> Visually Impaired
          </label>
        </div>
        <Button disabled={isGenerating} type="submit" className="w-full">
          {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {index === 3 ? "Plan Trip" : "Next"}
        </Button>
      </form>
    </div>
  );
};

const TripDisplay: React.FC<{ tripData: TripData | null }> = ({ tripData }) => {
  if (!tripData) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Your Trip Itinerary</h2>
      <Tabs defaultValue="hotels">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hotels">Hotels</TabsTrigger>
          <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
        </TabsList>

        <TabsContent value="hotels">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tripData.hotels.map((hotel, index) => (
              <Card key={index} className="overflow-hidden">
                <img
                  src={hotel.hotelImageUrl}
                  alt={hotel.hotelName}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{hotel.hotelName}</CardTitle>
                  <CardDescription>{hotel.hotelAddress}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    <strong>Price:</strong> {hotel.price}
                  </p>
                  <p>
                    <strong>Rating:</strong> {hotel.rating}
                  </p>
                  <p>
                    <strong>Description:</strong> {hotel.description}
                  </p>
                  <p>
                    <strong>Accessibility Features:</strong>{" "}
                    {hotel.accessibilityFeatures.join(", ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="itinerary">
          {tripData.itinerary.map((day, dayIndex) => (
            <Card key={dayIndex} className="mb-6">
              <CardHeader>
                <CardTitle>{day.day}</CardTitle>
              </CardHeader>
              <CardContent>
                {day.plan.map((activity, activityIndex) => (
                  <div
                    key={activityIndex}
                    className="mb-4 p-4 bg-secondary rounded-lg"
                  >
                    <h3 className="text-lg font-semibold">
                      {activity.time} - {activity.placeName}
                    </h3>
                    <p>
                      <strong>Details:</strong> {activity.placeDetails}
                    </p>
                    <p>
                      <strong>Ticket Price:</strong> {activity.ticketPricing}
                    </p>
                    <p>
                      <strong>Time to Travel:</strong> {activity.timeToTravel}
                    </p>
                    <p>
                      <strong>Accessibility Notes:</strong>{" "}
                      {activity.accessibilityNotes}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Bot, Loader2, User2, Armchair, Ear, Eye } from 'lucide-react';
// import { toast } from 'sonner';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { Message } from './components/message';
// import { AccessibilityInputType, aiMessages, accessibilityInputs } from './lib/util';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
// import { Checkbox } from '@/components/ui/checkbox';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import TripDisplay from './components/TripDisplay';
// type Trip = {
//   destination: string;
//   days: number;
//   budget: string;
//   wheelchair: boolean;
//   hearingImpaired: boolean;
//   visuallyImpaired: boolean;
// };

// type TripData = {
//   hotels: Array<{
//     hotelName: string;
//     hotelAddress: string;
//     price: string;
//     hotelImageUrl: string;
//     geoCoordinates: string;
//     rating: string;
//     description: string;
//     accessibilityFeatures: string[];
//   }>;
//   itinerary: Array<{
//     day: string;
//     plan: Array<{
//       time: string;
//       placeName: string;
//       placeDetails: string;
//       placeImageUrl: string;
//       geoCoordinates: string;
//       ticketPricing: string;
//       timeToTravel: string;
//       accessibilityNotes: string;
//     }>;
//   }>;
// };

// const Page: React.FC = () => {
//   const [formData, setFormData] = useState<Trip>({
//     destination: '',
//     days: 1,
//     budget: '',
//     wheelchair: false,
//     hearingImpaired: false,
//     visuallyImpaired: false,
//   });

//   const [messages, setMessages] = useState([...aiMessages]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [tripData, setTripData] = useState<TripData | null>(null);

//   const [currTripInput, setCurrentTripInput] = useState<{
//     index: number;
//     name: AccessibilityInputType;
//     placeholder: string;
//     value: string;
//   }>({
//     index: 0,
//     name: 'destination',
//     placeholder: 'Where would you like to go?',
//     value: '',
//   });

//   const nav = useRouter();

//   // Speech synthesis for text-to-speech
//   const speak = (text: string) => {
//     if ('speechSynthesis' in window) {
//       const utterance = new SpeechSynthesisUtterance(text);
//       utterance.rate = 1; // Speech rate
//       utterance.pitch = 1; // Pitch level
//       utterance.volume = 1; // Volume level
//       window.speechSynthesis.speak(utterance);
//     } else {
//       console.error('Speech Synthesis not supported.');
//     }
//   };

//   useEffect(() => {
//     const latestMessage = messages[messages.length - 1]?.content;
//     if (latestMessage) {
//       speak(latestMessage);
//     }
//   }, [messages]);

//   const handleTripInputChange = (index: number) => {
//     setMessages((prev) => [
//       ...prev,
//       {
//         role: 'assistant',
//         content: accessibilityInputs[index].placeholder,
//       },
//     ]);
//     setCurrentTripInput({
//       index,
//       name: accessibilityInputs[index].input as AccessibilityInputType,
//       placeholder: accessibilityInputs[index].placeholder,
//       value: String(formData[accessibilityInputs[index].input as keyof Trip]),
//     });
//   };

//   const handleNext = async () => {
//     const nextInd = currTripInput.index + 1;
//     const nextInput = accessibilityInputs[nextInd];

//     setMessages((prev) => [
//       ...prev,
//       { role: 'assistant', content: nextInd <= 3 ? nextInput.placeholder : 'Generating Trip...' },
//     ]);

//     if (nextInd <= 3) {
//       setCurrentTripInput({
//         index: nextInd,
//         name: nextInput.input as AccessibilityInputType,
//         placeholder: nextInput.placeholder,
//         value: '',
//       });
//     } else {
//       await generateTrip();
//     }
//   };

//   const generateTrip = async () => {
//     if (!formData.budget || !formData.days || !formData.destination) {
//       toast.error('Please fill all the required details');
//       return;
//     }

//     setIsGenerating(true);

//     try {
//       const response = await fetch('/api/accessible-trip-planner', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           days: Number(formData.days),
//         }),
//       });

//       const res = await response.json();

//       if (!response.ok) {
//         toast.error(res.message || 'An error occurred while generating the trip.');
//         return;
//       }

//       setTripData(res.trip);
//       toast.success('Trip generated successfully!');
//     } catch (error) {
//       console.error('Error generating trip:', error);
//       toast.error('An error occurred while generating the trip.');
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   return (
//     <div className="mx-auto flex h-screen w-full max-w-7xl flex-col p-6 md:px-24 text-white">
//       <Card className="flex h-full flex-1 flex-col border-none bg-gray-800 shadow-md shadow-gray-700 rounded-lg">
//         <CardHeader>
//           <CardTitle className="text-3xl font-bold text-teal-400">Accessible Trip Planner</CardTitle>
//           <CardDescription className="text-gray-400">Plan your accessible trip with confidence</CardDescription>
//         </CardHeader>
//         <CardContent className="flex-1 overflow-y-auto scroll-smooth">
//           {messages.map((msg, i) => (
//             <Message key={i} message={msg} />
//           ))}
//           {isGenerating && (
//             <div className="flex flex-col items-center justify-center space-y-4 p-8">
//               <Loader2 className="h-12 w-12 animate-spin text-teal-400" />
//               <p className="text-lg font-semibold">Generating your perfect trip...</p>
//             </div>
//           )}
//           {tripData && <TripDisplay tripData={tripData} />}
//         </CardContent>
//         <CardFooter className="p-6 bg-gray-900">
//           <TripInput
//             placeholder={currTripInput.placeholder}
//             tripInput={currTripInput.name}
//             inputValue={formData[currTripInput.name as keyof Trip] ? String(formData[currTripInput.name as keyof Trip]) : ''}
//             handleChange={(v) => setFormData((prev) => ({ ...prev, [currTripInput.name]: v }))}
//             handleInput={(index) => handleTripInputChange(index)}
//             index={currTripInput.index}
//             handleNext={handleNext}
//             isGenerating={isGenerating}
//             formData={formData}
//             setFormData={setFormData}
//           />
//         </CardFooter>
//       </Card>
//     </div>
//   );
// };

// interface TripInputProps {
//   placeholder: string;
//   index: number;
//   tripInput: AccessibilityInputType;
//   inputValue: string;
//   handleChange: (value: string) => void;
//   handleInput: (index: number) => void;
//   handleNext: () => void;
//   isGenerating: boolean;
//   formData: Trip;
//   setFormData: React.Dispatch<React.SetStateAction<Trip>>;
// }

// const TripInput: React.FC<TripInputProps> = ({
//   placeholder,
//   handleChange,
//   index,
//   handleInput,
//   handleNext,
//   inputValue,
//   isGenerating,
//   formData,
//   setFormData,
// }) => {
//   return (
//     <div className="flex w-full flex-col items-center gap-2 p-2">
//       <TooltipProvider>
//         <div className="flex items-center gap-1">
//           {accessibilityInputs.map((inp, i) => (
//             <Tooltip key={i}>
//               <TooltipTrigger
//                 disabled={isGenerating}
//                 onClick={() => handleInput(i)}
//                 className={`${index === i ? 'bg-teal-400' : 'bg-gray-600'} rounded-full p-3`}
//               >
//                 {<inp.icon size={22} />}
//               </TooltipTrigger>
//               <TooltipContent className="text-gray-400">{inp.input}</TooltipContent>
//             </Tooltip>
//           ))}
//         </div>
//       </TooltipProvider>
//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           handleNext();
//         }}
//         className="flex w-full flex-col items-center gap-2"
//       >
//         <Input
//           disabled={isGenerating}
//           className="w-full text-white"
//           type={index === 1 ? 'number' : 'text'}
//           min={index === 1 ? 1 : undefined}
//           max={30}
//           value={inputValue}
//           onChange={(e) => handleChange(e.target.value)}
//           placeholder={placeholder}
//         />
//         <div className="flex w-full justify-between gap-2">
//           <Button disabled={isGenerating} type="submit" className="w-full bg-teal-500 hover:bg-teal-600">
//             {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             {index === 3 ? 'Plan Trip' : 'Next'}
//           </Button>
//         </div>
//       </form>
//       {/* <TripDisplay tripData={tripData}/> */}
//     </div>
//   );
// };

// // const TripDisplay: React.FC<{ tripData: TripData }> = ({ tripData }) => (
// //   <div className="text-center">
// //     <h2 className="text-2xl font-semibold text-teal-400">Trip Details</h2>
// //     {/* Render trip itinerary and hotels here */}

//   // </div>
// // );

// export default Page;
