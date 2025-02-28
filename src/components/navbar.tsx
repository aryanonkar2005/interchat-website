
import React from "react";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const loginBtnClicked = () => {
    window.location.href = "/signin";
  }
  return (
    <header className="sticky top-0 pt-[1px] sm:pt-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <Logo className="-ml-4 sm:ml-0"/>
        <div className="-mr-4 sm:mr-0 flex items-center gap-4">
          <ThemeToggle />
          <Button className="text-white px-6 pb-[0.6rem]" onClick={loginBtnClicked}>
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}
