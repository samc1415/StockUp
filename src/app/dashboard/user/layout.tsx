"use client"

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link"
import { ThemeProvider } from "@/components/theme-provider"

import {
  ChartArea,
  CircleUser,
  Download,
  Home,
  Menu,
  Package,
  Package2,
  Upload,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/ui/modeToggle"
import {
  SiStockx,
} from "react-icons/si";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
<<<<<<< HEAD
      <div className="bg-[#393d32] dark:bg-transparent grid min-h-[calc(100vh-52px)] w-full md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr]">
=======
      <div className="bg-[#393d32] dark:bg-transparent grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[240px_1fr]">
>>>>>>> ed53fb7 (Updated files)
        <div className="hidden md:block dark:bg-muted/40">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="text-white flex items-center gap-2 font-semibold">
                <SiStockx className="h-6 w-6" />
                <span className="">Stockup</span>
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid gap-4 items-start text-sm font-medium mt-8">
              <Link
                  href="/dashboard/user"
                  className={`text-white flex items-center gap-3 pl-6 pr-3 py-2 transition-all hover:bg-[#2e3327] dark:hover:bg-muted ${pathname === '/dashboard/user' && 'bg-[#2e3327] dark:bg-muted'
                    }`}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/user/portfolio"
                  className={`text-white flex items-center gap-3 pl-6 pr-3 py-2 transition-all hover:bg-[#2e3327] dark:hover:bg-muted ${pathname === '/dashboard/user/portfolio' && 'bg-[#2e3327] dark:bg-muted'
                    }`}
                >
                  <Package className="h-4 w-4" />
                  Porfolio
                </Link>
                <Link
                  href="/dashboard/user/transaction-history"
                  className={`text-white flex items-center gap-3 pl-6 pr-3 py-2 transition-all hover:bg-[#2e3327] dark:hover:bg-muted ${pathname === '/dashboard/user/transaction-history' && 'bg-[#2e3327] dark:bg-muted'
                    }`}
                >
                  <ChartArea className="h-4 w-4" />
                  Transactions
                </Link>
                <Link
                  href="/dashboard/user/deposit"
                  className={`text-white flex items-center gap-3 pl-6 pr-3 py-2 text-muted-foreground transition-all hover:bg-[#2e3327] dark:hover:bg-muted ${pathname === '/dashboard/user/deposit' && 'bg-[#2e3327] dark:bg-muted'
                    }`}
                >
                  <Download className="h-4 w-4" />
                  Deposit Cash
                </Link>
                <Link
                  href="/dashboard/user/withdraw"
                  className={`text-white flex items-center gap-3 pl-6 pr-3 py-2 text-muted-foreground transition-all hover:bg-[#2e3327] dark:hover:bg-muted ${pathname === '/dashboard/user/withdraw' && 'bg-[#2e3327] dark:bg-muted'
                    }`}
                >
                  <Upload className="h-4 w-4" />
                  Withdraw Cash
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="bg-[#393d32] dark:bg-muted/40 flex h-14 items-center gap-4 pr-4 lg:h-[60px] lg:pr-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden ml-4"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="sr-only h-6 w-6" />
                    <span className="sr-only">Samstocks</span>
                  </Link>
                  <Link
                    href="/dashboard/user/transaction-history"
                    className="mx-[-0.65rem] flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Transactions
                  </Link>
                  <Link
                    href="/dashboard/user/deposit"
                    className="mx-[-0.65rem] flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Deposit Cash
                  </Link>
                  <Link
                    href="/dashboard/user/withdraw"
                    className="mx-[-0.65rem] flex items-center gap-4 px-3 py-2 text-muted-foreground hover:text-foreground"
                  >
                    <Users className="h-5 w-5" />
                    Withdraw Cash
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="md:hidden flex h-14 items-center pr-4 lg:h-[60px] lg:px-6">
              <Link href="/" className="text-white flex items-center gap-2 font-semibold">
                <SiStockx className="h-4 w-4 md:h-6 md:w-6" />
                <span className="text-sm">SamStocks</span>
              </Link>
            </div>

            <div className="w-full flex-1"></div>
            <p className="hidden md:block text-white text-sm font-base">Hi! Sam Doe</p>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" className="rounded-full text-white bg-[#2e3327] hover:bg-[#393d32] dark:bg-secondary dark:hover:bg-secondary border-[#2e3327]">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href="/dashboard/user/settings" passHref>
                  <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href="/auth/login" passHref>
                  <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:block text-white text-sm font-base">
              Cash Balance = $3,200
            </div>
            <Button className="hidden hover:bg-primary/50 dark:hover:bg-primary/90 md:block px-5 text-xs">Buy/Sell Stocks</Button>
            <ModeToggle />
          </header>
          <main className="bg-white dark:bg-transparent rounded-2xl flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">

            {children}

          </main>

        </div>
      </div>

    </ThemeProvider>
  )
}
