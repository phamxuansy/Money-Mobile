import { ThemeToggle } from "@/components/ThemeToggle";
import { Dashboard } from "@/components/Dashboard";
import { AddExpense } from "@/components/AddExpense";
import { Toaster } from "@/components/ui/sonner";
import { Waves } from "lucide-react";
export function HomePage() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-accent/20 opacity-50 blur-[100px]"></div>
      </div>
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-2 items-center">
            <Waves className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-bold font-display">Zenith Ledger</h1>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <ThemeToggle className="relative top-0 right-0" />
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Dashboard />
      </main>
      <AddExpense />
      <Toaster richColors closeButton position="top-right" />
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground">
            Built with ❤️ at Cloudflare
          </p>
        </div>
      </footer>
    </div>
  );
}