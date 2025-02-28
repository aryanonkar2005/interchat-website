"use client";

import * as React from "react";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { FaGoogle, FaGithub } from "react-icons/fa";
import {Navbar} from "@/components/navbar-for-login-page.tsx";
import {useLocation, useNavigate} from "react-router-dom";

export default function AuthPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const tab = location.pathname.replace('/', '') || 'signin';

    const handleTabChange = (value: string) => {
        navigate(`/${value}`);
    };
    return (
        <div className="flex min-h-[100svh] flex-col">
            <Navbar/>
            <main className="flex-1 flex items-center py-16">
                <div className="container relative flex items-center justify-center">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <Tabs defaultValue="signin" onValueChange={handleTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin">Sign In</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="johndoe@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" />
                                </div>
                                <Button className="w-full text-white bg-[hsl(211,100%,48%)] hover:bg-[hsl(211,100%,40%)]">
                                    Sign In
                                </Button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline">
                                        <FaGoogle className="mr-2 h-4 w-4" />
                                        Google
                                    </Button>
                                    <Button variant="outline">
                                        <FaGithub className="mr-2 h-4 w-4" />
                                        Github
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="signup" className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">Name</Label>
                                    <Input id="full-name" placeholder="John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input id="signup-email" type="email" placeholder="johndoe@example.com" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <Input id="signup-password" type="password" />
                                </div>
                                <Button className="w-full text-white bg-[hsl(211,100%,48%)] hover:bg-[hsl(211,100%,40%)]">
                                    Sign Up
                                </Button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline">
                                        <FaGoogle className="mr-2 h-4 w-4" />
                                        Google
                                    </Button>
                                    <Button variant="outline">
                                        <FaGithub className="mr-2 h-4 w-4" />
                                        Github
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <footer className="w-full py-6 border-t">
                <div className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} InterChat. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Terms
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Privacy
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4" href="#">
                            Contact
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
