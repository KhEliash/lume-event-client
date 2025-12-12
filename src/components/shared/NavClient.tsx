/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import LogoutButton from "./logoutButton";

// export default function NavClient({ isLoggedIn }: { isLoggedIn: boolean }) {
//   const [open, setOpen] = useState(false);

  
//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/about", label: "About" },
//     { href: "/events", label: "Events" },
//     { href: "/contact", label: "Contact" },
//     { href: "/dashboard", label: "Dashboard" },
//   ];

//   return (
//     <header className="border-b bg-background">
//       <nav className="mx-auto  flex h-16 max-w-7xl items-center justify-between px-4">
//         <Link href="/" className="text-xl font-semibold tracking-tight">
//           Lume Event
//         </Link>

//         <ul className="hidden gap-8 text-sm font-medium md:flex">
//           {navLinks.map((link) => (
//             <li key={link.href}>
//               <Link
//                 href={link.href}
//                 className="transition-colors hover:text-primary"
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
//             <LogoutButton />
//           )}

//           <button className="md:hidden" onClick={() => setOpen(!open)}>
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </nav>

//       {open && (
//         <div className="border-t bg-background md:hidden">
//           <ul className="flex flex-col gap-4 p-4 text-sm font-medium">
//             {navLinks.map((link) => (
//               <li key={link.href}>
//                 <Link href={link.href} className="block">
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
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LogoutButton from "./logoutButton";
import { getMe } from "@/services/user/userprofile";

// 1. Updated Interface to be more flexible
interface UserData {
  success: boolean;
  message?: any;
  result?: {
    fullName: string;
    role: string;
    email: string;
    _id: string;
  };
  events?: any[]; // Added this to match the API return type
}

export default function NavClient({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUser = async () => {
        try {
          const data = await getMe();
          
          // 2. Type Guard: Only set state if the API call was successful
          // and actually contains the result we expect
          if (data && data.success) {
            setUserData(data as UserData); 
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUser();
    }
  }, [isLoggedIn]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  if (isLoggedIn) {
    navLinks.push({ href: "/dashboard", label: "Dashboard" });
  }

  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-indigo-600">
          Lume Event
        </Link>

        <ul className="hidden gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="transition-colors hover:text-indigo-600 text-gray-600">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <Link href="/login">
              <Button className="cursor-pointer">Login</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* 3. Optional Chaining for safe rendering */}
              {userData?.result && (
                <span className="hidden sm:block text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                  {userData.result.fullName}
                </span>
              )}
              <LogoutButton />
            </div>
          )}

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t bg-background md:hidden">
          <ul className="flex flex-col gap-2 p-4 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="block p-2" onClick={() => setOpen(false)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}