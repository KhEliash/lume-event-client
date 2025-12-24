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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { UserPlus, Loader2 } from "lucide-react";

export function SignupForm({ className }: React.ComponentProps<"div">) {
  const [role, setRole] = useState<"user" | "host">("user");
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(registerUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
    if (state && state.success && state.message) {
      toast.success(state.message);
      router.push("/login");
    }
  }, [state, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <Card className="rounded-none border-t-8 border-t-amber-400 border-x-0 border-b-0 shadow-[20px_20px_0px_0px_rgba(6,78,59,0.3)] bg-white">
        <CardHeader className="space-y-4 pt-10 px-8 text-center">
          <div className="flex justify-center">
            <div className="bg-emerald-950 p-3 rounded-br-2xl rounded-tl-2xl">
              <UserPlus className="text-amber-400 w-8 h-8" />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-black uppercase tracking-tighter text-emerald-950">
              Create Account
            </CardTitle>
            <CardDescription className="font-medium text-emerald-900/60 uppercase text-[10px] tracking-widest">
              Join the Lume Community
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form action={formAction} className="space-y-5">
            <input type="hidden" name="role" value={role} />

            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="name"
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-900"
                >
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="rounded-none border-2 border-emerald-950/10 focus-visible:ring-0 focus-visible:border-amber-400 bg-emerald-50/30 h-11"
                />
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-900"
                >
                  Email Address
                </Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="rounded-none border-2 border-emerald-950/10 focus-visible:ring-0 focus-visible:border-amber-400 bg-emerald-50/30 h-11"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-[10px] font-black uppercase tracking-widest text-emerald-900"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="rounded-none border-2 border-emerald-950/10 focus-visible:ring-0 focus-visible:border-amber-400 bg-emerald-50/30 h-11"
                />
              </div>

              {/* Role Select */}
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-widest text-emerald-900">
                  I am a...
                </Label>
                <Select
                  value={role}
                  onValueChange={(value) => setRole(value as "user" | "host")}
                >
                  <SelectTrigger className="rounded-none border-2 border-emerald-950/10 focus:ring-0 bg-emerald-50/30 h-11 font-bold text-xs uppercase tracking-wider text-emerald-950">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none border-2 border-emerald-950 font-bold uppercase text-[10px] tracking-widest">
                    <SelectItem value="user" className="focus:bg-emerald-50">
                      Attendee (User)
                    </SelectItem>
                    <SelectItem value="host" className="focus:bg-emerald-50">
                      Event Host
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-none bg-emerald-950 text-white font-black uppercase tracking-widest hover:bg-emerald-900 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all disabled:opacity-70"
            >
              {isPending ? (
                <Loader2 className="animate-spin text-amber-400" />
              ) : (
                "Create Account"
              )}
            </Button>

            <div className="text-center pt-2">
              <p className="text-[11px] font-bold text-emerald-900/40 uppercase tracking-widest">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-amber-600 hover:text-emerald-950 transition-colors border-b border-amber-400/30 pb-0.5"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
