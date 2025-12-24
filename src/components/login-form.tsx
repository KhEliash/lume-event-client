"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { loginUser } from "@/services/auth/loginUser";
import { toast } from "sonner";
import {
  CalendarDays,
  Loader2,
  User,
  ShieldCheck,
  UserCog,
} from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
      window.location.reload();
    }
  }, [state]);

  const handleQuickAccess = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("123456");
    toast.info(`Credentials set for ${roleEmail.split("@")[0]}`, {
      icon: "🔑",
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="rounded-none border-t-8 border-t-amber-400 border-x-0 border-b-0 shadow-[20px_20px_0px_0px_rgba(6,78,59,0.3)] bg-white">
        <CardHeader className="space-y-4 pt-10 px-8">
          <div className="flex justify-center">
            <div className="bg-emerald-950 p-3 rounded-br-2xl rounded-tl-2xl">
              <CalendarDays className="text-amber-400 w-8 h-8" />
            </div>
          </div>
          <div className="text-center space-y-1">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-emerald-950">
              Welcome Back
            </CardTitle>
            <CardDescription className="font-medium text-emerald-900/60 uppercase text-[10px] tracking-widest">
              Authorized Access Only
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form action={formAction} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-900"
                >
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                  className="rounded-none border-2 border-emerald-950/10 focus-visible:ring-0 focus-visible:border-amber-400 bg-emerald-50/30 h-12"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[10px] font-black uppercase tracking-widest text-emerald-900"
                  >
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="rounded-none border-2 border-emerald-950/10 focus-visible:ring-0 focus-visible:border-amber-400 bg-emerald-50/30 h-12"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-none bg-emerald-950 text-white font-black uppercase tracking-widest hover:bg-emerald-900 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] active:shadow-none transition-all"
            >
              {isPending ? (
                <Loader2 className="animate-spin text-amber-400" />
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Quick Access Section */}
            <div className="pt-6 border-t border-emerald-950/5">
              <p className="text-center text-[9px] font-black text-emerald-900/40 uppercase tracking-[0.2em] mb-4">
                Dev Quick Access
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickAccess("user@gmail.com")}
                  className="flex flex-col items-center gap-1.5 p-2 border-2 border-emerald-950/5 hover:border-amber-400 transition-colors group"
                >
                  <User
                    size={14}
                    className="text-emerald-950 group-hover:text-amber-600"
                  />
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    User
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAccess("admin@gmail.com")}
                  className="flex flex-col items-center gap-1.5 p-2 border-2 border-emerald-950/5 hover:border-amber-400 transition-colors group"
                >
                  <ShieldCheck
                    size={14}
                    className="text-emerald-950 group-hover:text-amber-600"
                  />
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    Admin
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAccess("host@gmail.com")}
                  className="flex flex-col items-center gap-1.5 p-2 border-2 border-emerald-950/5 hover:border-amber-400 transition-colors group"
                >
                  <UserCog
                    size={14}
                    className="text-emerald-950 group-hover:text-amber-600"
                  />
                  <span className="text-[8px] font-black uppercase tracking-tighter">
                    Host
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center pt-2">
              <p className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-widest">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="text-amber-600 hover:text-emerald-950 transition-colors border-b border-amber-400/30 hover:border-emerald-950 pb-0.5"
                >
                  Create One
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
