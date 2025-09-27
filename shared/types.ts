// This file is shared between the frontend and the backend.
// Do not add any frontend-specific or backend-specific code to this file.
export const categories = [
  "Groceries",
  "Utilities",
  "Transport",
  "Dining Out",
  "Entertainment",
  "Shopping",
  "Health",
  "Other",
] as const;
export type Category = (typeof categories)[number];
export type TimePeriod = "day" | "week" | "month" | "year";
export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string; // Using ISO string for serialization
  category: Category;
}
export type TransactionCreatePayload = Omit<Transaction, "id">;
export type TransactionUpdatePayload = Partial<TransactionCreatePayload>;
// Generic API response wrapper
export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };