
import React from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import {FastForward, MonitorSmartphone, ShieldCheck} from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full min-h-[calc(100svh-4rem)] max-h-screen flex items-center py-8 md:py-12">
      <div className="container px-6 md:px-8">
        <div className="flex gap-6 justify-center xl:justify-start mb-4">
          <div className="flex flex-col justify-center space-y-10">
            <div className="space-y-8">
              <h1 className="max-w-lg text-center xl:text-left text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl/none">
                Connect with the world through InterChat
              </h1>
              <p className="m-auto xl:ml-0 max-w-xs text-center lg:max-w-lg xl:text-left text-muted-foreground md:text-xl">
                Fast, secure, and designed for modern conversations. Experience messaging like never before.
              </p>
            </div>
            <div className="justify-center xl:justify-start flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" className="gap-1 text-white">
                Start Chatting
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
          <div className="hidden mr-0 ml-auto w-1/2 xl:flex items-center justify-center">
            <div className="relative h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] lg:h-[400px] lg:w-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background rounded-full animate-pulse" />
              <div className="absolute inset-4 bg-background rounded-full flex items-center justify-center">
                <img src="/interchat-blue-no-bg.svg" className="h-24 w-24 sm:h-28 sm:w-28 lg:h-36 lg:w-36 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-6 sm:space-y-2">
            <h2 className="hidden sm:block text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features that set us apart
            </h2>
            <h2 className="sm:hidden text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Features
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              InterChat combines the best of messaging technologies with a beautiful interface
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center space-y-2 rounded-lg p-4 transition-all hover:bg-muted">
              <div className="rounded-full bg-primary/10 p-2">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold">{feature.title}</h3>
              <p className="text-center text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const features = [
  {
    title: "Real-time Messaging",
    description: "Send and receive messages instantly with no delay or lag",
    icon: <FastForward className="h-6 w-6 text-primary" />,
  },
  {
    title: "End-to-End Encryption",
    description: "Your conversations are secure and private with advanced encryption",
    icon: <ShieldCheck className="h-6 w-6 text-primary" />,
  },
  {
    title: "Cross-platform Support",
    description: "Use InterChat on any device - mobile, desktop, or web",
    icon: <MonitorSmartphone className="h-6 w-6 text-primary" />,
  },
];

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
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
};

export default Index;
