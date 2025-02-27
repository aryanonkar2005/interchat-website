
import React from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <Logo className="-ml-2"/>
        <div className="-mr-2 flex items-center gap-4">
          <ThemeToggle />
          <Button className="text-white px-6 pb-[0.6rem]">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
