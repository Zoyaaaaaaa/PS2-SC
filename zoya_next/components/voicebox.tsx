"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn, voiceModels } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface BaseModel {
  list: {
    label: string;
    value: string;
  };
}

const voices = voiceModels;

export function VoiceBox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("aura-orpheus-en");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? voiceModels.find((voice) => voice.value === value)?.label
            : "Select Voice..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Voice..." />
          <CommandList>
            <CommandEmpty>No Voice found.</CommandEmpty>
            <CommandGroup>
              {voices.map((voice) => (
                <CommandItem
                  key={voice.value}
                  value={voice.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === voice.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {voice.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
