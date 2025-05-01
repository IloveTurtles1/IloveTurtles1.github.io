import React from "react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  onGetStarted: () => void;
};

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          <span className="block">Secure & Simple</span>
          <span className="block mt-2 bg-gradient-to-r from-brand-purple to-brand-blue bg-clip-text text-transparent">
            Authentication
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
          Welcome to our platform where security meets simplicity. Experience seamless 
          authentication and unlock the full potential of our services.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button 
            onClick={onGetStarted}
            size="lg" 
            className="bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-90 transition-opacity text-lg"
          >
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="text-lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

