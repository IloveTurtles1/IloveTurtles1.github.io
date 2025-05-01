import React, { useState, useEffect } from "react";
import AuthForm from "@/components/AuthForm";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Index = () => {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Handle potential auth redirect from Supabase
    const handleAuthRedirect = async () => {
      // Check URL for auth parameters after redirect
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Auth redirect error:", error);
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
    };
    
    handleAuthRedirect();
    
    // Check for existing session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleAuthSubmit = async (email: string, password: string) => {
    try {
      if (isLogin) {
        // Get current URL to use for redirects
        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        
        // Handle sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
          options: {
            redirectTo
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Successfully logged in",
          description: "Welcome back!",
        });
      } else {
        // Get current URL to use for redirects
        const redirectTo = `${window.location.origin}${window.location.pathname}`;
        
        // Handle sign up
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectTo
          }
        });
        
        if (error) throw error;
        
        toast({
          title: "Sign up successful",
          description: "Please check your email for a confirmation link.",
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Authentication error",
          description: error.message,
          variant: "destructive",
        });
      }
      throw error;
    }
  };

  // ... keep existing code (handleSignOut, handleGetStarted, handleToggleForm functions)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1">
        {session ? (
          <div className="container mx-auto px-4 py-16 flex flex-col items-center min-h-[80vh]">
            <h1 className="text-3xl font-bold mb-6">Welcome, {session.user.email}</h1>
            <p className="text-gray-600 mb-8">You are now signed in to your account.</p>
            <Button 
              onClick={handleSignOut}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
        ) : showAuthForm ? (
          <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[80vh] bg-hero-pattern">
            <AuthForm 
              isLogin={isLogin} 
              onSubmit={handleAuthSubmit} 
              onToggleForm={handleToggleForm}
            />
          </div>
        ) : (
          <>
            <div className="bg-hero-pattern">
              <Hero onGetStarted={handleGetStarted} />
            </div>
            <Features />
          </>
        )}
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Index;

