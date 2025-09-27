import { create } from "zustand";
import { Transaction, TimePeriod, TransactionCreatePayload, TransactionUpdatePayload } from "@shared/types";
import { api } from "@/lib/api-client";
import {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
interface TransactionState {
  transactions: Transaction[];
  timePeriod: TimePeriod;
  loading: boolean;
  error: string | null;
  setTimePeriod: (period: TimePeriod) => void;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: TransactionCreatePayload) => Promise<void>;
  updateTransaction: (id: string, transaction: TransactionUpdatePayload) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getFilteredTransactions: () => Transaction[];
}
export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  timePeriod: "month",
  loading: true,
  error: null,
  setTimePeriod: (period) => {
    set({ timePeriod: period });
    get().fetchTransactions();
  },
  fetchTransactions: async () => {
    set({ loading: true, error: null });
    try {
      const { timePeriod } = get();
      const now = new Date();
      let startDate: Date, endDate: Date;
      switch (timePeriod) {
        case "day":
          startDate = startOfDay(now);
          endDate = endOfDay(now);
          break;
        case "week":
          startDate = startOfWeek(now);
          endDate = endOfWeek(now);
          break;
        case "month":
          startDate = startOfMonth(now);
          endDate = endOfMonth(now);
          break;
        case "year":
          startDate = startOfYear(now);
          endDate = endOfYear(now);
          break;
      }
      const url = `/api/transactions?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
      const transactions = await api<Transaction[]>(url);
      set({ transactions, loading: false });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
      console.error("Failed to fetch transactions:", error);
    }
  },
  addTransaction: async (transaction) => {
    try {
      await api<Transaction>('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(transaction),
      });
      await get().fetchTransactions();
    } catch (error) {
      console.error("Failed to add transaction:", error);
      throw error;
    }
  },
  updateTransaction: async (id, transaction) => {
    try {
      await api<Transaction>(`/api/transactions/${id}`, {
        method: 'PUT',
        body: JSON.stringify(transaction),
      });
      await get().fetchTransactions();
    } catch (error) {
      console.error("Failed to update transaction:", error);
      throw error;
    }
  },
  deleteTransaction: async (id) => {
    try {
      await api(`/api/transactions/${id}`, {
        method: 'DELETE',
      });
      await get().fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction:", error);
      throw error;
    }
  },
  getFilteredTransactions: () => {
    return get().transactions;
  },
}));