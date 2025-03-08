"use client"

import * as React from "react"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx"
import {FaGithub} from "react-icons/fa"
import {TbFaceId} from "react-icons/tb"
import {Navbar} from "@/components/navbar-for-login-page.tsx"
import {useLocation, useNavigate} from "react-router-dom"
import {useRef, useState} from "react"
import axios from "axios"
import * as Toast from "@radix-ui/react-toast"
import {Eye, EyeOff} from "lucide-react";

enum ToastType {
    Error,
    Normal
}

export default function AuthPage() {
    const [toastMsg, setToastMsg] = useState("")
    const [toastStyle, setToastStyle] = useState("dark:bg-white/5 bg-black/5 dark:ring-white/10 ring-black/10")
    const [toastVisible, setToastVisible] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showSignUpPassword, setShowSignUpPassword] = useState(false)
    const [signUpEyeVisible, setSignUpEyeVisible] = useState(false)
    const [eyeVisible, setEyeVisible] = useState(false)
    const signInBtnRef = useRef(null)
    const signInEmailRef = useRef(null)
    const signInPasswordRef = useRef(null)
    const signUpBtnRef = useRef(null)
    const signUpNameRef = useRef(null)
    const signUpEmailRef = useRef(null)
    const signUpPasswordRef = useRef(null)
    const navigate = useNavigate()

    const handleTabChange = (value: string) => {
        navigate(`/${value}`)
    }

    function displayToast(msg: string, type: ToastType = ToastType.Normal) {
        switch (type) {
            case ToastType.Error:
                setToastStyle("dark:bg-red-500/30 bg-red-500/30 dark:ring-red-500/50 ring-red-500/50")
                break
            case ToastType.Normal:
                setToastStyle("dark:bg-white/5 bg-white/5 dark:ring-white/10 ring-black/10")
                break
        }
        setToastVisible(true)
        setToastMsg(msg)
    }

    const signInBtnClicked = async (e: React.FormEvent) => {
        e.preventDefault()
        const email:string = signInEmailRef.current.value
        const password:string = signInPasswordRef.current.value
        if(email.length == 0) {
            displayToast("Email is required", ToastType.Error)
            return
        }
        if(password.length == 0) {
            displayToast("Password is required", ToastType.Error)
            return
        }
        if(!email.includes("@")) {
            displayToast("Email must contain @ symbol", ToastType.Error)
            return
        }
        try {
            await axios.post('http://localhost:8080/api/login', {
                email: email,
                password: password,
            }, {
                withCredentials:true,
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(() => {
                signInEmailRef.current.value = ''
                signInPasswordRef.current.value = ''
                window.location.replace("http://localhost:8081/")
            }).catch(err => {
                if (err.response.data.exception == "BadCredentialsException" || err.response.data.exception == "InternalAuthenticationServiceException") {
                    displayToast("Invalid credentials", ToastType.Error)
                } else displayToast(err.response.data.exception, ToastType.Error)
            })
        }catch (e) {
            displayToast("Network error", ToastType.Error)
        }
    }

    const signUpBtnClicked = async (e: React.FormEvent) => {
        e.preventDefault()
        const name = signUpNameRef.current.value
        const email = signUpEmailRef.current.value
        const password = signUpPasswordRef.current.value

        if(name.length == 0) {
            displayToast("Name is required", ToastType.Error)
            return
        }
        if(email.length == 0) {
            displayToast("Email is required", ToastType.Error)
            return
        }
        if(password.length == 0) {
            displayToast("Password is required", ToastType.Error)
            return
        }
        if(!email.includes("@")) {
            displayToast("Email must contain @ symbol", ToastType.Error)
            return
        }
        if(password.length < 8) {
            displayToast("Password must be at least 8 characters long", ToastType.Error)
            return
        }
        if(password.length > 32) {
            displayToast("Password should not have more than 32 characters", ToastType.Error)
            return
        }
        try {
            await axios.post('http://localhost:8080/api/register', {
                name: name,
                email: email,
                password: password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                signUpNameRef.current.value = ''
                signUpEmailRef.current.value = ''
                signUpPasswordRef.current.value = ''
                const login = async () => {
                    await axios.post('http://localhost:8080/api/login', {
                        email: email,
                        password: password,
                    }, {
                        withCredentials:true,
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                }
                try{
                    login()
                }catch (ignored){ /* empty */ }
                window.location.replace("http://localhost:8081/")
            }).catch(err => {
                if (err.response.data.exception == "ConstraintViolationException") {
                    displayToast("User already exists", ToastType.Error)
                } else displayToast(err.response.data.exception, ToastType.Error)
            })
        }catch (e) {
            displayToast("Network error", ToastType.Error)
        }
    }

    const gitHubBtnClicked = async (e: React.FormEvent) => {
        e.preventDefault()
        window.location.href = "http://localhost:8080/oauth2/authorization/github"
    }

    return (
        <div className="flex min-h-[100svh] flex-col">
            <Navbar/>
            <main className="flex-1 flex items-center py-16">
                <Toast.Provider swipeDirection="up">
                    <Toast.Root
                        open={toastVisible}
                        onOpenChange={setToastVisible}
                        className={`${toastStyle} ring-1 w-max fixed top-4 left-1/2 transform -translate-x-1/2 backdrop-blur-sm text-foreground py-4 px-8 rounded-lg shadow-lg`}
                    >
                        <Toast.Title className="font-semibold">{toastMsg}</Toast.Title>
                    </Toast.Root>

                    <Toast.Viewport className="fixed top-4 left-1/2 transform -translate-x-1/2 w-auto z-50"/>
                </Toast.Provider>
                <div className="container relative flex items-center justify-center">
                    <div className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
                        <Tabs defaultValue="signin" onValueChange={handleTabChange} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="signin">Sign In</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>

                            <TabsContent value="signin" className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" ref={signInEmailRef} type="email" className="border border-input"
                                           onKeyDown={event => {
                                               if (event.key == "Enter" || event.key == "ArrowDown") signInPasswordRef.current.focus()
                                           }}
                                           placeholder="johndoe@example.com"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signin-password">Password</Label>
                                    <div className="relative w-full">
                                        <Input id="signin-password" ref={signInPasswordRef}
                                               onInput={event => {
                                                   event.preventDefault()
                                                   if(signInPasswordRef.current.value.length < 1) setEyeVisible(false)
                                                   else setEyeVisible(true)
                                               }}
                                               type={showPassword ? "text" : "password"}
                                               onKeyDown={event => {
                                                   if (event.key == "Enter" || event.key == "ArrowDown") signInBtnRef.current.click()
                                                   else if (event.key == "ArrowUp") signInEmailRef.current.focus()
                                               }}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-none bg-background border border-input border-l-0 ${eyeVisible?"":"hidden"}`}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    onClick={signInBtnClicked}
                                    ref={signInBtnRef}
                                    className="w-full text-white bg-[hsl(211,100%,48%)] hover:bg-[hsl(211,100%,40%)]">
                                    Sign In
                                </Button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t"/>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline">
                                        <TbFaceId className="mr-2 h-4 w-4"/>
                                        Face ID
                                    </Button>
                                    <Button variant="outline" onClick={gitHubBtnClicked}>
                                        <FaGithub className="mr-2 h-4 w-4"/>
                                        Github
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="signup" className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">Name</Label>
                                    <Input id="full-name" ref={signUpNameRef} placeholder="John Doe" className="capitalize"
                                           onKeyDown={event => {
                                               if (event.key == "Enter" || event.key == "ArrowDown") signUpEmailRef.current.focus()
                                           }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-email">Email</Label>
                                    <Input id="signup-email" ref={signUpEmailRef} type="email"
                                           placeholder="johndoe@example.com"
                                           onKeyDown={event => {
                                               if (event.key == "Enter" || event.key == "ArrowDown") signUpPasswordRef.current.focus()
                                               else if (event.key == "ArrowUp") signUpNameRef.current.focus()
                                           }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="signup-password">Password</Label>
                                    <div className="relative w-full">
                                        <Input id="signup-password" ref={signUpPasswordRef}
                                               onInput={event => {
                                                   event.preventDefault()
                                                   if(signUpPasswordRef.current.value.length < 1) setSignUpEyeVisible(false)
                                                   else setSignUpEyeVisible(true)
                                               }}
                                               type={showSignUpPassword ? "text" : "password"}
                                               onKeyDown={event => {
                                                   if (event.key == "Enter" || event.key == "ArrowDown") signUpBtnRef.current.click()
                                                   else if (event.key == "ArrowUp") signUpEmailRef.current.focus()
                                               }}
                                        />
                                        <Button
                                            type="button"
                                            size="icon"
                                            variant="ghost"
                                            className={`absolute right-0 top-1/2 transform -translate-y-1/2 rounded-l-none bg-background border border-input border-l-0 ${signUpEyeVisible?"":"hidden"}`}
                                            onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                                        >
                                            {showSignUpPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                        </Button>
                                    </div>
                                </div>
                                <Button
                                    ref={signUpBtnRef}
                                    onClick={signUpBtnClicked}
                                    className="w-full text-white bg-[hsl(211,100%,48%)] hover:bg-[hsl(211,100%,40%)]">
                                    Sign Up
                                </Button>

                                <div className="relative my-4">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t"/>
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant="outline">
                                        <TbFaceId className="mr-2 h-4 w-4"/>
                                        Face ID
                                    </Button>
                                    <Button variant="outline" onClick={gitHubBtnClicked}>
                                        <FaGithub className="mr-2 h-4 w-4"/>
                                        Github
                                    </Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <footer className="w-full py-6 border-t">
                <div
                    className="container flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between">
                    <p className="text-center text-sm text-muted-foreground">
                        © {new Date().getFullYear()} InterChat. All rights reserved.
                    </p>
                    <nav className="flex gap-4 sm:gap-6">
                        <a className="text-sm font-medium hover:underline underline-offset-4">
                            Terms
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4">
                            Privacy
                        </a>
                        <a className="text-sm font-medium hover:underline underline-offset-4">
                            Contact
                        </a>
                    </nav>
                </div>
            </footer>
        </div>
    )
}
