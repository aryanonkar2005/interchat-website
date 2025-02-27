
import React from "react";
import { cn } from "@/lib/utils";
import {Image} from "@radix-ui/react-avatar";

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
}

const handleClick = () => {
    window.location.href = "https://interchat.vercel.app";
};

export function Logo({ className, size = 24, withText = true }: LogoProps) {
  return (
    <div onClick={handleClick} className={cn("flex items-center gap-4 cursor-pointer", className)}>
      <div className="relative">
        <img src="/interchat-white-no-bg.svg" className="sm:mt-0.5 hidden dark:block" width={size} height={size}/>
        <img src="/interchat-blue-no-bg.svg" className="sm:mt-0.5 dark:hidden" width={size} height={size}/>
      </div>
      {withText && (
        <span className="font-medium text-xl mt-[1px] text-primary dark:text-white select-none">InterChat</span>
      )}
    </div>
  );
}
