import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
}
export function MetricCard({ title, value, icon, className }: MetricCardProps) {
  return (
    <Card className={cn("glass-card transition-all duration-300 hover:border-accent", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}