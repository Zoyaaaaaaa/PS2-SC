import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { VoiceBox } from "./voicebox";

const Header = () => {
  return (
    <header>
      <Card className="p-4 flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/logo.svg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Orator
        </CardTitle>
        <CardDescription className="flex items-center justify-between">
          <VoiceBox />
        </CardDescription>
      </Card>
    </header>
  );
};

export default Header;
