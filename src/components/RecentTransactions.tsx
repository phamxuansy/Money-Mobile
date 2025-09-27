import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Transaction } from "@shared/types";
import { format, parseISO } from "date-fns";
import { Tag, TrendingUp, Utensils, ShoppingCart, Bus, Film, HeartPulse, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { EditExpense } from "./EditExpense";
import { DeleteExpense } from "./DeleteExpense";
const categoryIcons: { [key in Transaction["category"]]: React.ReactNode } = {
  Groceries: <ShoppingCart className="h-4 w-4" />,
  Utilities: <TrendingUp className="h-4 w-4" />,
  Transport: <Bus className="h-4 w-4" />,
  "Dining Out": <Utensils className="h-4 w-4" />,
  Entertainment: <Film className="h-4 w-4" />,
  Shopping: <Tag className="h-4 w-4" />,
  Health: <HeartPulse className="h-4 w-4" />,
  Other: <MoreHorizontal className="h-4 w-4" />
};
export function RecentTransactions({ transactions }: { transactions: Transaction[]; }) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setActiveTransaction(transaction);
    setEditOpen(true);
  };
  const handleDelete = (transaction: Transaction) => {
    setActiveTransaction(transaction);
    setDeleteOpen(true);
  };
  return (
    <>
      <Card className="glass-card col-span-1">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>
            Your latest {transactions.length} transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[350px]">
            <div className="space-y-2">
              {transactions.length > 0 ?
                transactions.map((transaction) =>
                  <div key={transaction.id} className="flex items-center p-2 rounded-md hover:bg-muted/50 transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent flex-shrink-0">
                      {categoryIcons[transaction.category]}
                    </div>
                    <div className="ml-4 space-y-1 flex-grow">
                      <p className="text-sm font-medium leading-none">
                        {transaction.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(parseISO(transaction.date), "MMM d, yyyy")}
                      </p>
                    </div>
                    <div className="ml-4 font-medium text-right">
                      -${transaction.amount.toFixed(2)}
                    </div>
                    <div className="ml-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(transaction)}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(transaction)} className="text-destructive focus:text-destructive focus:bg-destructive/10">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ) :
                <div className="text-center text-muted-foreground py-16">
                  <p>No transactions for this period.</p>
                </div>
              }
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <EditExpense transaction={activeTransaction} open={isEditOpen} onOpenChange={setEditOpen} />
      <DeleteExpense transaction={activeTransaction} open={isDeleteOpen} onOpenChange={setDeleteOpen} />
    </>
  );
}