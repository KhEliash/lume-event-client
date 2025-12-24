/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import LogoutButton from "./logoutButton";
// import { getMe } from "@/services/user/userprofile";

// // 1. Updated Interface to be more flexible
// interface UserData {
//   success: boolean;
//   message?: any;
//   result?: {
//     fullName: string;
//     role: string;
//     email: string;
//     _id: string;
//   };
//   events?: any[]; // Added this to match the API return type
// }

// export default function NavClient({ isLoggedIn }: { isLoggedIn: boolean }) {
//   const [open, setOpen] = useState(false);
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     if (isLoggedIn) {
//       const fetchUser = async () => {
//         try {
//           const data = await getMe();

//           // 2. Type Guard: Only set state if the API call was successful
//           // and actually contains the result we expect
//           if (data && data.success) {
//             setUserData(data as UserData);
//           }
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       };
//       fetchUser();
//     }
//   }, [isLoggedIn]);

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/events", label: "Events" },
//     { href: "/contact", label: "Contact" },
//   ];

//   if (isLoggedIn) {
//     navLinks.push({ href: "/dashboard", label: "Dashboard" });
//   }

//   return (
//     <header className="border-b bg-background sticky top-0 z-50">
//       <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
//         <Link
//           href="/"
//           className="text-xl font-bold tracking-tight text-indigo-600"
//         >
//           Lume Event
//         </Link>

//         <ul className="hidden gap-8 text-sm font-medium md:flex">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className="transition-colors hover:text-indigo-600 text-gray-600"
//               >
//                 {link.label}
//               </Link>
//             </li>
//           ))}
//         </ul>

//         <div className="flex items-center gap-4">
//           {!isLoggedIn ? (
//             <Link href="/login">
//               <Button className="cursor-pointer">Login</Button>
//             </Link>
//           ) : (
//             <div className="flex items-center gap-3">
//               {/* 3. Optional Chaining for safe rendering */}
//               {userData?.result && (
//                 <span className="hidden sm:block text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
//                   {userData.result.fullName}
//                 </span>
//               )}
//               <LogoutButton />
//             </div>
//           )}

//           <button className="md:hidden" onClick={() => setOpen(!open)}>
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </nav>

//       {open && (
//         <div className="border-t bg-background md:hidden">
//           <ul className="flex flex-col gap-2 p-4 text-sm font-medium">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <Link
//                   href={link.href}
//                   className="block p-2"
//                   onClick={() => setOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, CalendarDays, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import LogoutButton from "./logoutButton";
import { getMe } from "@/services/user/userprofile";
import { cn } from "@/lib/utils";

interface UserData {
  success: boolean;
  message?: any;
  result?: {
    fullName: string;
    role: string;
    email: string;
    _id: string;
  };
  events?: any[];
}

export default function NavClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const data = await getMe();
          if (data && data.success) {
            setUserData(data as UserData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoggedIn]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Browse Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  // Primary: #064e3b (Emerald 900)
  // Accent: #fbbf24 (Amber 400)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-emerald-950/95 backdrop-blur-md border-b border-emerald-800/50 py-3"
          : "bg-background border-b border-transparent py-5"
      )}
    >
      <nav className="mx-auto flex container items-center justify-between px-2 md:px-6">
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-amber-400 p-1.5 rounded-br-xl rounded-tl-xl group-hover:rounded-tr-xl group-hover:rounded-bl-xl transition-all duration-300">
            <CalendarDays className="text-emerald-950 w-5 h-5" />
          </div>
          <span
            className={cn(
              "text-xl font-black tracking-tight uppercase transition-colors",
              scrolled ? "text-white" : "text-emerald-950"
            )}
          >
            Lume<span className="text-amber-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center bg-secondary/50 rounded-full px-2 py-1 border border-border/40">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:text-amber-500",
                scrolled ? "text-emerald-50/80" : "text-emerald-900/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={cn(
                "px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all hover:text-amber-500",
                scrolled ? "text-emerald-50/80" : "text-emerald-900/70"
              )}
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Desktop Actions */}
        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2">
              {/* <Link href="/login">
                <Button
                  variant="ghost"
                  className={cn(
                    "text-xs font-bold uppercase tracking-tighter",
                    scrolled
                      ? "text-white hover:text-amber-400"
                      : "text-emerald-950 hover:text-emerald-700"
                  )}
                >
                  Login
                </Button>
              </Link> */}
              <Link href="/login">
                <Button className="cursor-pointer bg-emerald-900 text-white hover:bg-emerald-800 text-xs font-bold uppercase px-6 rounded-none shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none">
                  Join Now
                </Button>
              </Link>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 group outline-none">
                  <Avatar className="h-9 w-9 border-2 border-amber-400/30 group-hover:border-amber-400 transition-colors">
                    <AvatarFallback className="bg-emerald-100 text-emerald-900 font-bold text-xs">
                      {userData?.result?.fullName
                        .substring(0, 2)
                        .toUpperCase() || "LE"}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform group-data-[state=open]:rotate-180",
                      scrolled ? "text-white" : "text-emerald-950"
                    )}
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-64 p-3 rounded-none border-2 border-emerald-900"
              >
                <DropdownMenuLabel className="pb-3">
                  <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">
                    Account
                  </p>
                  <p className="text-sm font-black text-emerald-950 truncate">
                    {userData?.result?.fullName}
                  </p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-emerald-100" />
                <DropdownMenuItem className="py-3 cursor-pointer focus:bg-emerald-50">
                  <Link
                    href="/dashboard"
                    className="w-full text-xs font-bold uppercase"
                  >
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-emerald-100" />
                <div className="pt-2">
                  <LogoutButton />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Toggle */}
          <button
            className={cn(
              "md:hidden p-2",
              scrolled ? "text-white" : "text-emerald-950"
            )}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={26} strokeWidth={2.5} />
            ) : (
              <Menu size={26} strokeWidth={2.5} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed inset-x-0 bg-emerald-950 transition-all duration-300 ease-in-out md:hidden overflow-hidden border-b border-amber-400/20",
          open ? "top-[65px] h-screen opacity-100" : "-top-full h-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-8 space-y-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-2xl font-black text-white uppercase tracking-tighter hover:text-amber-400"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {!isLoggedIn && (
            <div className="flex flex-col gap-4 pt-10">
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button className="w-full bg-amber-400 text-emerald-950 hover:bg-amber-500 rounded-none uppercase font-bold py-6">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
