import { FairnessOracleForm } from "@/components/admin/FairnessOracleForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export default function AdminFairnessOraclePage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-accent text-glow-accent">AI Fairness Oracle</h1>
        <p className="text-muted-foreground">Dynamically adjust game parameters using AI to ensure fairness and profitability.</p>
      </header>

      <FairnessOracleForm />

      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center"><Lightbulb className="mr-2 text-yellow-400"/> How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p>The AI Fairness Oracle analyzes the provided game data (total bets, total payouts, current house edge) against the casino's target 80/20 redistribution rule.</p>
          <p>It then suggests a new house edge percentage for the specified game to help align its performance with this economic target over time.</p>
          <p>The reasoning provided by the AI explains its recommendation. Use this information to make informed decisions about game parameter adjustments.</p>
          <p><strong>Note:</strong> This tool provides suggestions. Final decisions on game parameters should be made by administrators considering all relevant factors.</p>
        </CardContent>
      </Card>
    </div>
  );
}
