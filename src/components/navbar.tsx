import React, {useEffect, useState} from "react";
import {Logo} from "./logo";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Avatar, AvatarFallback, AvatarImage} from "@radix-ui/react-avatar";
import {ChevronDown, ChevronUp, LoaderCircle, Monitor, Moon, Sun, User} from "lucide-react";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Separator} from "@radix-ui/react-dropdown-menu";
import {useTheme} from "next-themes";
import {Select, SelectContent, SelectItem, SelectTrigger} from "@radix-ui/react-select";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogPortal,
    DialogTitle
} from "@radix-ui/react-dialog";

enum authenticationStatus {
    LOADING, AUTHENTICATED, UNAUTHENTICATED
}

export function Navbar() {
    const {theme, setTheme} = useTheme()
    const [authStatus, setAuthStatus] = useState(authenticationStatus.LOADING);
    const [user, setUser] = useState(null);
    const [themeDialogVisible, setThemeDialogVisible] = useState(false);
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
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
    useEffect(() => {
        getLoggedInUser();
    },[])
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
            className="sticky top-0 pt-[1px] sm:pt-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Dialog open={themeDialogVisible}>
                <DialogPortal>
                    <DialogOverlay className="fixed -inset-1 bg-slate-950/50 data-[state=open]:animate-overlayShow" onClick={()=>setThemeDialogVisible(false)} />
                    <DialogContent className="fixed left-1/2 top-1/2 max-h-[85vh] min-w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-secondary px-10 pt-8 pb-10 shadow-xl shadow-black/20 dark:shadow-black/50 focus:outline-none data-[state=open]:animate-contentShow">
                        <DialogTitle className="m-0 text-xl font-medium text-foreground">
                            Choose a theme
                        </DialogTitle>
                        <RadioGroup className="flex flex-col gap-6 mt-7" defaultValue={theme} onValueChange={(value)=>{
                            setTheme(value)
                            setThemeDialogVisible(false);
                        }}>
                            {['light', 'dark', 'system'].map((theme) => (
                                <div key={theme} className="flex items-center gap-4">
                                    <RadioGroupItem
                                        value={theme}
                                        id={theme}
                                        className="w-6 h-6 rounded-full border border-gray-300">
                                    </RadioGroupItem>
                                    <Label htmlFor={theme} className="capitalize text-xl flex items-center gap-4">
                                        {theme === 'light'}
                                        {theme === 'dark'}
                                        {theme === 'system'}
                                        {theme}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
            <div className="container flex h-16 items-center justify-between py-4">
                <Logo className="-ml-4 sm:ml-0"/>
                <div className="-mr-4 sm:mr-0 flex items-center gap-4">
                    <div className={authStatus == authenticationStatus.UNAUTHENTICATED ? "" : "hidden"}>
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
                    <Button
                        className={"text-white px-6 pb-[0.6rem] " + (authStatus == authenticationStatus.UNAUTHENTICATED ? "" : "hidden")}
                        onClick={loginBtnClicked}>
                        Sign In
                    </Button>
                    <Avatar
                        className={"h-10 w-10 rounded-full overflow-hidden border-gray-300 " + (authStatus == authenticationStatus.LOADING ? "inline-flex" : "hidden")}>
                        <AvatarFallback
                            className="animate-spin w-full flex items-center justify-center p-2 dark:bg-primary/50 bg-primary/25 hover:bg-primary/50 hover:dark:bg-primary/75 text-foreground text-lg">
                            <LoaderCircle strokeWidth={1}/>
                        </AvatarFallback>
                    </Avatar>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <div
                                className={"flex items-center justify-center gap-2.5 sm:gap-4 " + (authStatus == authenticationStatus.AUTHENTICATED ? "" : "hidden")}>
                                <span className="text-lg text-foreground">{user?.name}</span>
                                <Avatar
                                    className={"inline-flex h-10 w-10 rounded-full overflow-hidden border-gray-300"}>
                                    <AvatarImage
                                        className="h-full w-full object-cover"
                                        src={user?.avatar_url}
                                        alt="User Avatar"
                                    />
                                    <AvatarFallback
                                        className="w-full flex items-center justify-center p-2 dark:bg-primary/50 bg-primary/25 hover:bg-primary/50 hover:dark:bg-primary/75 text-foreground text-lg">
                                        <User strokeWidth={1}/>
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <div className="flex-col leading-8 px-3.5 pb-3.5 pt-2">
                                <span className="text-xl text-foreground">{user?.name}</span><br/>
                                <span className="text-sm font-semibold text-muted-foreground">{user?.email}</span>
                            </div>
                            <Separator className="bg-input h-[1px] mx-2"/>
                            <DropdownMenuItem className="mx-1 my-2 px-2.5 py-2 sm:hidden capitalize"
                                              onClick={() => setThemeDialogVisible(true)}>
                                Theme: {theme}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="mx-1 my-2 p-0 hidden sm:flex">
                                <Select onOpenChange={(o)=>{
                                    setThemeDropdownOpen(o)
                                }} onValueChange={setTheme}>
                                    <SelectTrigger className="w-full text-left flex outline-none px-2.5 py-2">
                                        <a className="capitalize text-foreground px-1">Theme: {theme}</a>
                                        {themeDropdownOpen ? <ChevronUp className="mr-0 ml-auto text-muted-foreground" size={20}/> : <ChevronDown className="mr-0 ml-auto text-muted-foreground" size={20}/>}
                                    </SelectTrigger>
                                    <SelectContent
                                        className="ml-32 mt-40 z-30 shadow-lg dark:shadow-black/50 bg-background border rounded-lg overflow-hidden">
                                        <SelectItem
                                            className="flex items-center text-left gap-4 outline-none py-2.5 px-4 dark:hover:bg-primary/50 hover:bg-primary/25"
                                            value="light">
                                            <Sun size={16} strokeWidth={1.5}/>
                                            <span>Light</span>
                                        </SelectItem>
                                        <SelectItem
                                            className="flex items-center text-left gap-4 outline-none py-2.5 px-4 dark:hover:bg-primary/50 hover:bg-primary/25"
                                            value="dark">
                                            <Moon size={16} strokeWidth={1.5}/>
                                            <span>Dark</span></SelectItem>
                                        <SelectItem
                                            className="flex items-center text-left gap-4 outline-none py-2.5 px-4 dark:hover:bg-primary/50 hover:bg-primary/25"
                                            value="system">
                                            <Monitor size={16} strokeWidth={1.5}/>
                                            <span>System</span>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                            </DropdownMenuItem>
                            <Separator className="bg-input h-[1px] mx-2"/>
                            <DropdownMenuItem className="mx-1 mb-1 mt-2" onClick={logoutBtnClicked}>
                                <span className="px-1 pb-0.5">Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}
