import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  TooltipProps
} from "recharts";
import {
  NameType,
  ValueType
} from "recharts/types/component/DefaultTooltipContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction, TimePeriod } from "@shared/types";
import {
  format,
  eachDayOfInterval,
  eachWeekOfInterval,
  eachMonthOfInterval,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  parseISO,
  getHours
} from "date-fns";
interface ExpenseChartProps {
  data: Transaction[];
  timePeriod: TimePeriod;
}
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background/80 p-2 shadow-sm backdrop-blur-sm">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Date
            </span>
            <span className="font-bold text-muted-foreground">{label}</span>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[0.70rem] uppercase text-muted-foreground">
              Amount
            </span>
            <span className="font-bold text-foreground">
              ${(payload[0].value as number).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export function ExpenseChart({ data, timePeriod }: ExpenseChartProps) {
  const processData = () => {
    const now = new Date();
    const transactionsWithDates = data.map(t => ({...t, dateObj: parseISO(t.date)}));
    if (timePeriod === "day") {
      const hours = Array.from({ length: 24 }, (_, i) => i);
      const hourlyData = hours.map(hour => ({
        name: format(new Date().setHours(hour), 'ha'),
        total: 0
      }));
      transactionsWithDates.forEach(t => {
        const hour = getHours(t.dateObj);
        hourlyData[hour].total += t.amount;
      });
      return hourlyData;
    }
    if (timePeriod === "week") {
      const weekDays = eachDayOfInterval({ start: startOfWeek(now), end: endOfWeek(now) });
      const dailyData = weekDays.map(day => ({
        name: format(day, 'EEE'),
        total: 0
      }));
      transactionsWithDates.forEach(t => {
        const dayIndex = dailyData.findIndex(d => d.name === format(t.dateObj, 'EEE'));
        if (dayIndex !== -1) {
          dailyData[dayIndex].total += t.amount;
        }
      });
      return dailyData;
    }
    if (timePeriod === "month") {
      const weekStarts = eachWeekOfInterval({ start: startOfMonth(now), end: endOfMonth(now) }, { weekStartsOn: 1 });
      const weeklyData = weekStarts.map(weekStart => ({
        name: format(weekStart, 'MMM d'),
        total: 0
      }));
      transactionsWithDates.forEach(t => {
        const weekStart = startOfWeek(t.dateObj, { weekStartsOn: 1 });
        const weekKey = format(weekStart, 'MMM d');
        const weekIndex = weeklyData.findIndex(w => w.name === weekKey);        if (weekIndex !== -1) {
          weeklyData[weekIndex].total += t.amount;
        }
      });
      return weeklyData;
    }
    if (timePeriod === "year") {
      const months = eachMonthOfInterval({ start: startOfYear(now), end: endOfYear(now) });
      const monthlyData = months.map(month => ({
        name: format(month, 'MMM'),
        total: 0
      }));
      transactionsWithDates.forEach(t => {
        const monthIndex = t.dateObj.getMonth();
        monthlyData[monthIndex].total += t.amount;
      });
      return monthlyData;
    }
    return [];
  };
  const chartData = processData();
  return (
    <Card className="glass-card col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Spending Trend</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={chartData}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted) / 0.3)', radius: 4 }} />
            <Bar dataKey="total" fill="url(#colorTotal)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}