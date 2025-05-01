
import React from "react";
import { cn } from "@/lib/utils";

type FooterProps = {
  className?: string;
};

const Footer = ({ className }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={cn("border-t py-6 md:py-8", className)}>
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground text-center md:text-left">
          &copy; {currentYear} Your Company. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

