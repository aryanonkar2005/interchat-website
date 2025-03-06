import React, {useState} from "react";
import {Logo} from "./logo";
import {ThemeToggle} from "./theme-toggle";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {Moon, Sun, User} from "lucide-react";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";

enum authenticationStatus {
    LOADING, AUTHENTICATED, UNAUTHENTICATED
}

export function Navbar() {
    const [authStatus, setAuthStatus] = useState(authenticationStatus.LOADING);
    const [user, setUser] = useState(null);
    const getLoggedInUser = async () => {
        try {
            await axios.get('http://localhost:8080/api/user', {withCredentials: true}).then((response) => {
                setUser(response.data);
                setAuthStatus(authenticationStatus.AUTHENTICATED);
            }).catch(err => {
                console.log(err)
                setAuthStatus(authenticationStatus.UNAUTHENTICATED);
            })
        } catch (e) {
            console.log(e)
            setAuthStatus(authenticationStatus.UNAUTHENTICATED);
        }
    }
    getLoggedInUser();
    const logoutBtnClicked = async () => {
        await axios.get('http://localhost:8080/logout', {withCredentials: true}).then((response) => {
            setAuthStatus(authenticationStatus.UNAUTHENTICATED);
        })
    }

    const loginBtnClicked = () => {
        window.location.href = "/signin";
    }
    return (
        <header
            className="sticky top-0 pt-[1px] sm:pt-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between py-4">
                <Logo className="-ml-4 sm:ml-0"/>
                <div className="-mr-4 sm:mr-0 flex items-center gap-4">
                    <ThemeToggle/>
                    <Button
                        className={"text-white px-6 pb-[0.6rem] " + (authStatus == authenticationStatus.UNAUTHENTICATED ? "" : "hidden")}
                        onClick={loginBtnClicked}>
                        Sign In
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar
                                className={"inline-flex h-10 w-10 rounded-full overflow-hidden border-2 border-gray-300 " + (authStatus == authenticationStatus.AUTHENTICATED ? "" : "hidden")}>
                                <AvatarImage
                                    className="h-full w-full object-cover"
                                    src={user?.avatar_url}
                                    alt="User Avatar"
                                />
                                <AvatarFallback
                                    className="w-full flex items-center justify-center p-2 font-semibold dark:bg-blue-950 bg-blue-100 text-foreground text-lg">
                                    <User/>
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="flex-col leading-8 px-3.5 pb-4 pt-2">
                                <span className="text-xl text-foreground">{user?.name}</span><br/>
                                <span className="text-sm font-semibold text-foreground/50">{user?.email}</span>
                            </div>
                            <DropdownMenuItem className="bg-foreground/5 mx-1 mb-1" onClick={logoutBtnClicked}>
                                <span className="px-1 pb-0.5">Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
