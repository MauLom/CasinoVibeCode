"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import the GenAI flow function and types
import { adjustGameParameters, type AdjustGameParametersInput, type AdjustGameParametersOutput } from "@/ai/flows/fairness-oracle";

const formSchema = z.object({
  gameName: z.string().min(1, { message: "Game name is required." }),
  totalBets: z.coerce.number().min(0, { message: "Total bets must be non-negative." }),
  totalPayouts: z.coerce.number().min(0, { message: "Total payouts must be non-negative." }),
  currentHouseEdge: z.coerce.number().min(0).max(100, { message: "House edge must be between 0 and 100." }),
});

export function FairnessOracleForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AdjustGameParametersOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gameName: "",
      totalBets: 0,
      totalPayouts: 0,
      currentHouseEdge: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const input: AdjustGameParametersInput = {
        gameName: values.gameName,
        totalBets: values.totalBets,
        totalPayouts: values.totalPayouts,
        currentHouseEdge: values.currentHouseEdge,
      };
      const output = await adjustGameParameters(input);
      setResult(output);
      toast({
        title: "Fairness Oracle Suggestion Received",
        description: `New house edge for ${values.gameName}: ${output.newHouseEdge}%.`,
      });
    } catch (error) {
      console.error("Error calling Fairness Oracle:", error);
      toast({
        title: "Error",
        description: "Failed to get suggestion from Fairness Oracle. Check console for details.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center"><Wand2 className="mr-2 text-primary"/> AI Fairness Oracle</CardTitle>
        <CardDescription>
          Get AI-powered suggestions to adjust game parameters for fairness and adherence to the 80/20 redistribution rule.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="gameName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Roulette Deluxe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="totalBets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Bets</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 100000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalPayouts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Payouts</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 80000" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currentHouseEdge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current House Edge (%)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 2.7" {...field} step="0.1" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Wand2 className="mr-2 h-4 w-4" />
              )}
              Get Suggestion
            </Button>
          </form>
        </Form>
      </CardContent>
      {result && (
        <CardFooter className="flex flex-col items-start space-y-4 border-t pt-6">
            <h3 className="text-lg font-semibold text-primary">Oracle's Suggestion:</h3>
            <div className="w-full space-y-2">
                <p><strong>New Suggested House Edge:</strong> <Badge variant="default" className="text-base bg-green-500/20 text-green-300 border-green-500/30">{result.newHouseEdge.toFixed(2)}%</Badge></p>
                <div>
                    <Label htmlFor="reasoning" className="font-semibold">Reasoning:</Label>
                    <Textarea id="reasoning" value={result.reasoning} readOnly rows={5} className="mt-1 bg-muted/50"/>
                </div>
            </div>
             <Button variant="outline" onClick={() => setResult(null)}>Clear Result</Button>
        </CardFooter>
      )}
    </Card>
  );
}
