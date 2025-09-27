import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransactionStore } from "@/store/transactionStore";
import { Transaction } from "@shared/types";
import { toast } from "sonner";
interface DeleteExpenseProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function DeleteExpense({ transaction, open, onOpenChange }: DeleteExpenseProps) {
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const handleDelete = async () => {
    if (!transaction?.id) return;
    try {
      await deleteTransaction(transaction.id);
      toast.success("Transaction deleted successfully.");
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to delete transaction.", {
        description: "Please try again later.",
      });
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            transaction from your records.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}