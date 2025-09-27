import React, { useEffect } from "react";
import { useTransactionStore } from "@/store/transactionStore";
import { MetricCard } from "./MetricCard";
import { ExpenseChart } from "./ExpenseChart";
import { RecentTransactions } from "./RecentTransactions";
import { CategoryChart } from "./CategoryChart";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Skeleton } from "@/components/ui/skeleton";
import { TimePeriod } from "@shared/types";
import { DollarSign, TrendingUp, Tag } from "lucide-react";
export function Dashboard() {
  const timePeriod = useTransactionStore((state) => state.timePeriod);
  const setTimePeriod = useTransactionStore((state) => state.setTimePeriod);
  const fetchTransactions = useTransactionStore((state) => state.fetchTransactions);
  const filteredTransactions = useTransactionStore((state) => state.getFilteredTransactions());
  const loading = useTransactionStore((state) => state.loading);
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);
  const totalSpend = filteredTransactions.reduce(
    (sum, t) => sum + t.amount,
    0
  );
  const topCategory =
    filteredTransactions.length > 0
      ? Object.entries(
          filteredTransactions.reduce((acc, t) => {
            acc[t.category] = (acc[t.category] || 0) + t.amount;
            return acc;
          }, {} as Record<string, number>)
        ).sort(([, a], [, b]) => b - a)[0][0]
      : "N/A";
  const totalTransactions = filteredTransactions.length;
  const handleTimePeriodChange = (value: TimePeriod) => {
    if (value) {
      setTimePeriod(value);
    }
  };
  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight font-display">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <ToggleGroup
            type="single"
            value={timePeriod}
            onValueChange={handleTimePeriodChange}
            aria-label="Select time period"
          >
            <ToggleGroupItem value="day" aria-label="Today">Day</ToggleGroupItem>
            <ToggleGroupItem value="week" aria-label="This Week">Week</ToggleGroupItem>
            <ToggleGroupItem value="month" aria-label="This Month">Month</ToggleGroupItem>
            <ToggleGroupItem value="year" aria-label="This Year">Year</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <>
            <Skeleton className="h-[110px]" />
            <Skeleton className="h-[110px]" />
            <Skeleton className="h-[110px]" />
          </>
        ) : (
          <>
            <MetricCard
              title="Total Spend"
              value={`$${totalSpend.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <MetricCard
              title="Total Transactions"
              value={totalTransactions.toString()}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <MetricCard
              title="Top Category"
              value={topCategory}
              icon={<Tag className="h-4 w-4" />}
            />
          </>
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {loading ? (
          <Skeleton className="h-[422px] col-span-1 lg:col-span-3" />
        ) : (
          <ExpenseChart data={filteredTransactions} timePeriod={timePeriod} />
        )}
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {loading ? (
          <>
            <Skeleton className="h-[422px]" />
            <Skeleton className="h-[422px]" />
          </>
        ) : (
          <>
            <RecentTransactions transactions={filteredTransactions.slice(0, 10)} />
            <CategoryChart data={filteredTransactions} />
          </>
        )}
      </div>
    </div>
  );
}