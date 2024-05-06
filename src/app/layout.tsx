import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Link from "next/link";

import {
  BadgeCheck,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Copy,
  CreditCard,
  File,
  Home,
  LineChart,
  ListFilter,
  LogOut,
  MoreVertical,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  Settings2,
  ShoppingCart,
  SquareGanttChart,
  Truck,
  Users2,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AuthProvider from "./AuthPrivider";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "./Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <main className="flex min-h-screen w-full flex-col bg-muted/40 relative h-screen overflow-y-scroll">
              <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                  <Link
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <Home className="h-5 w-5" />
                          <span className="sr-only">Dashboard</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    {" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/my_briefcase"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <Package className="h-5 w-5" />
                          <span className="sr-only">My Briefcase</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">My Briefcase</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    {" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/contact"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <Users2 className="h-5 w-5" />
                          <span className="sr-only">Contact</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Contact</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    {" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/user_feedbacks"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <BadgeCheck className="h-5 w-5" />
                          <span className="sr-only">Feedbacks</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        User Feedbacks
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    {" "}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/profile"
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <Settings className="h-5 w-5" />
                          <span className="sr-only">Profile</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Profile</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href="/login"
                          // onClick={() => {
                          //   localStorage.removeItem("user");
                          // }}
                          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                        >
                          <LogOut className="h-5 w-5" />
                          <span className="sr-only">Logout</span>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent side="right">Logout</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </nav>
              </aside>

              {/* main */}
              <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <Header />
                {children}
              </div>

              {/* ======================== bottom nav */}
              <nav className="lg:hidden px-7 w-full left-0 bg-background  border shadow-lg rounded-t-sm  fixed bottom-0 z-40">
                <div className="flex">
                  <div className="flex-1 group">
                    <Link
                      href="/"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <Home className="h-5 w-5 mx-auto" />
                        <span className="block text-xs pb-1">Home</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/my_briefcase"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <Package className="h-5 w-5 mx-auto" />
                        <span className="block text-xs pb-1">Briefcase</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/user_feedbacks"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <Package className="h-5 w-5 mx-auto" />
                        <span className="block text-xs pb-1">Feedback</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/contact"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <Users2 className="h-5 w-5 mx-auto" />
                        <span className="block text-xs pb-1">Contact</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/itinerary"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <CalendarCheck className="h-5 w-5" />
                        <span className="block text-xs pb-1"> Itinerary</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/itinerary"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <SquareGanttChart className="h-5 w-5" />

                        <span className="block text-xs pb-1">Meetings</span>
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 group">
                    <Link
                      href="/profile"
                      className="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-primary"
                    >
                      <span className="block px-1 pt-1 pb-2">
                        <Settings className="h-5 w-5 mx-auto" />
                        <span className="block text-xs pb-1">Profile</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </nav>
            </main>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
