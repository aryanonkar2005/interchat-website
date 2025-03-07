"use client";

import * as React from "react";
import {Monitor, Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ToggleGroup, ToggleGroupItem} from "@radix-ui/react-toggle-group";

const toggleGroupItemClasses = "flex size-[35px] p-2.5 items-center justify-center bg-primary/5 text-foreground first:rounded-l" +
    " last:rounded-r dark:hover:bg-primary/50 hover:bg-primary/25 focus:outline-none" +
    " dark:data-[state=on]:bg-primary/50 data-[state=on]:bg-primary/25";

export function ThemeToggle() {
    const {setTheme} = useTheme();
    return (
        <div>
            <div className="sm:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
                            <Sun
                                className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                            <Moon
                                className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            Dark
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                            System
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <ToggleGroup
                    className="space-x-px rounded bg-foreground/5 shadow hidden sm:inline-flex"
                    type="single"
                    defaultValue="center"
                    aria-label="Text alignment">
                    <ToggleGroupItem
                        onClick={() => {
                            setTheme("light")
                        }}
                        className={toggleGroupItemClasses}
                        value="left"
                        aria-label="Light mode">
                        <Sun/>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        onClick={() => {
                            setTheme("system")
                        }}
                        className={toggleGroupItemClasses}
                        value="center"
                        aria-label="System theme">
                        <Monitor/>
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        onClick={() => {
                            setTheme("dark")
                        }}
                        className={toggleGroupItemClasses}
                        value="right"
                        aria-label="Dark mode">
                        <Moon/>
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}
