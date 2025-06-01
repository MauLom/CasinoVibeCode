"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { LifeBuoy, MessageSquare, HelpCircle, Search, Send } from "lucide-react";

const faqItems = [
  {
    question: "How do I deposit cryptocurrency?",
    answer: "Navigate to the Wallet page, select your desired cryptocurrency, and click 'Deposit'. You will be provided with a unique deposit address. Send your funds to this address from your personal wallet or exchange."
  },
  {
    question: "What are the withdrawal limits and fees?",
    answer: "Withdrawal limits vary by cryptocurrency and your account level. Standard network transaction fees apply, which are displayed before confirming your withdrawal. We do not charge additional withdrawal fees."
  },
  {
    question: "Is my information secure?",
    answer: "Yes, we use industry-standard security measures, including Firebase Authentication, end-to-end encryption for sensitive data, and strict Firestore rules. We also recommend enabling Two-Factor Authentication (2FA) for your account."
  },
  {
    question: "How does the 80/20 redistribution rule work?",
    answer: "Our casino operates on a global economic rule where 80% of all bets placed across all games are redistributed as prizes to players over time. The remaining 20% is retained by the casino. Game probabilities are dynamically adjusted by our AI Fairness Oracle to maintain this ratio."
  },
  {
    question: "What if I have a problem with a game?",
    answer: "If you encounter any issues or discrepancies with a game, please contact our support team immediately with details of the game, time of play, and a description of the problem. We will investigate thoroughly."
  }
];

export default function SupportPage() {
  const handleSubmitSupportTicket = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Support ticket submitted (not implemented).");
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <LifeBuoy className="w-16 h-16 mx-auto mb-4 text-primary neon-glow-primary" />
        <h1 className="text-3xl font-bold text-primary text-glow-primary">Support Center</h1>
        <p className="text-lg text-muted-foreground">We're here to help! Find answers or contact our support team.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><HelpCircle className="mr-2 h-6 w-6 text-accent"/> Frequently Asked Questions</CardTitle>
              <CardDescription>Find quick answers to common questions.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Search FAQs..." className="pl-10 w-full" />
              </div>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-6 w-6 text-accent"/> Contact Support</CardTitle>
              <CardDescription>Can't find an answer? Submit a support ticket.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitSupportTicket} className="space-y-4">
                <div>
                  <Label htmlFor="support-subject">Subject</Label>
                  <Input id="support-subject" placeholder="e.g., Issue with Aviator game" required />
                </div>
                <div>
                  <Label htmlFor="support-message">Message</Label>
                  <Textarea id="support-message" placeholder="Please describe your issue in detail..." rows={5} required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Send className="mr-2 h-4 w-4"/> Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>
          <Card className="bg-accent/10 border-accent">
            <CardHeader>
              <CardTitle className="text-accent">Live Chat (Coming Soon)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent-foreground/80">
                Our live chat support will be available soon for instant assistance.
              </p>
              <Button variant="outline" className="w-full mt-3 border-accent text-accent hover:bg-accent hover:text-accent-foreground" disabled>
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
