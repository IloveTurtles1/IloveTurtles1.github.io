import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight, Lock, User, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

type AuthFormProps = {
  isLogin?: boolean;
  onSubmit: (email: string, password: string) => Promise<void>;
  onToggleForm: () => void;
};

const AuthForm = ({ isLogin = true, onSubmit, onToggleForm }: AuthFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please provide both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setLoading(true);
    
    try {
      await onSubmit(email, password);
    } catch (error) {
      console.error("Authentication error:", error);
      toast({
        title: "Authentication Error",
        description: error instanceof Error ? error.message : "Failed to authenticate",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          {isLogin ? "Login to your account" : "Create an account"}
        </CardTitle>
        <CardDescription className="text-center">
          {isLogin 
            ? "Enter your email and password to login" 
            : "Enter your details to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-brand-purple to-brand-indigo hover:opacity-90 transition-opacity"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                Processing
                <span className="ml-2 animate-pulse">...</span>
              </span>
            ) : (
              <span className="flex items-center">
                {isLogin ? "Sign In" : "Sign Up"}
                <LogIn className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="text-sm text-center text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button 
            variant="link" 
            onClick={onToggleForm} 
            className="pl-1 text-brand-purple"
          >
            {isLogin ? "Sign up" : "Sign in"}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

