import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  Icon: LucideIcon;
  iconColorClass?: string; // e.g., "text-primary", "text-green-500"
  trend?: string; // e.g., "+5.2% from last month"
  trendColorClass?: string; // e.g., "text-green-500", "text-red-500"
}

export function StatsCard({ title, value, description, Icon, iconColorClass = "text-primary", trend, trendColorClass }: StatsCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-5 w-5 ${iconColorClass}`} />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground pt-1">
            {description}
          </p>
        )}
        {trend && (
           <p className={`text-xs pt-1 ${trendColorClass || 'text-muted-foreground'}`}>
            {trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
