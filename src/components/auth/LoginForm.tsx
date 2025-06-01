
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";

import { Mail, KeyRound, ShieldQuestion, Loader2 } from 'lucide-react';
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useToast } from "../../hooks/use-toast";
import { auth } from "../../lib/firebase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";


const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isWalletLoading, setIsWalletLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      form.reset();
      router.push("/dashboard"); // Redirect to dashboard or desired page
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Failed to login. Please check your credentials.";
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password. Please try again.";
      }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleWalletLogin = async () => {
    setIsWalletLoading(true);
    // TODO: Implement Web3 Wallet login (MetaMask, WalletConnect)
    console.log("Wallet login initiated");
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    toast({
        title: "Wallet Login",
        description: "Wallet login is not yet implemented.",
        variant: "default"
    });
    setIsWalletLoading(false);
  };

  return (
    <Card className="w-full max-w-md shadow-xl bg-card/90 backdrop-blur-sm border-primary/20">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center text-primary text-glow-primary">Welcome Back!</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Login to access your account and start playing.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input placeholder="you@example.com" {...field} className="pl-10" disabled={isLoading || isWalletLoading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground/80">Password</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input type="password" placeholder="••••••••" {...field} className="pl-10" disabled={isLoading || isWalletLoading} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading || isWalletLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login with Email"}
            </Button>
          </form>
        </Form>
        <Separator className="my-6" />
        <div className="space-y-4">
          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground" onClick={handleWalletLogin} disabled={isLoading || isWalletLoading}>
            {isWalletLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldQuestion className="w-5 h-5 mr-2" />} 
            Connect Wallet
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-2">
        <Link href="/signup" className="text-sm text-accent hover:underline">
          Don't have an account? Sign Up
        </Link>
        <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
          Forgot password?
        </Link>
      </CardFooter>
    </Card>
  );
}
