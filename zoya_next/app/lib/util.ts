import { Bot, CalendarIcon, DollarSignIcon, MapPinIcon, User2, User2Icon } from "lucide-react";

// _lib/utils.ts
export type AccessibilityInputType = "destination" | "days" | "budget" | "wheelchair" | "sign-language" | "visual-aids";

export const accessibilityInputs = [
  { input: "destination", placeholder: "Where would you like to go?", icon: MapPinIcon },
  { input: "days", placeholder: "How many days is your trip?", icon: CalendarIcon },
  { input: "budget", placeholder: "What's your budget?", icon: DollarSignIcon },
  { input: "traveler", placeholder: "What type of traveler are you?", icon: User2Icon },
];
export const aiMessages = [
  { role: "assistant", content: "Welcome to Accessible Trip Planner! Let’s get started." },
];
