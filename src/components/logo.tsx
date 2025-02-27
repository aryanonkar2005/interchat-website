
import React from "react";
import { cn } from "@/lib/utils";
import {Image} from "@radix-ui/react-avatar";

interface LogoProps {
  className?: string;
  size?: number;
  withText?: boolean;
}

export function Logo({ className, size = 24, withText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <div className="relative">
        <img src="/interchat-white-no-bg.svg" className="mt-0.5 hidden dark:block" width={size} height={size}/>
        <img src="/interchat-blue-no-bg.svg" className="mt-0.5 dark:hidden" width={size} height={size}/>
      </div>
      {withText && (
        <span className="font-medium text-xl text-primary dark:text-white">InterChat</span>
      )}
    </div>
  );
}
