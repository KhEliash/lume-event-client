"use client";
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
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth/registerUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
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
  }, [state,router]);
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
  <FieldGroup>
    <Field>
      <FieldLabel htmlFor="name">Full Name</FieldLabel>
      <Input
        id="name"
        name="name"
        type="text"
        placeholder="John Doe"
        required
      />
    </Field>

    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        name="email"
        id="email"
        type="email"
        placeholder="m@example.com"
        required
      />
    </Field>

    <Field>
      <FieldLabel htmlFor="password">Password</FieldLabel>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="****"
        required
      />
    </Field>

    {/* ✅ Role Select */}
    <Field>
      <FieldLabel>Role</FieldLabel>

      {/* Hidden input so form action receives role */}
      <input type="hidden" name="role" value={role} />

  <Select
    value={role}
    onValueChange={(value) => setRole(value as "user" | "host")}
  >
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="host">Host</SelectItem>
        </SelectContent>
      </Select>
    </Field>

    <FieldGroup>
      <Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating Account..." : "Create Account"}
        </Button>

        <FieldDescription className="px-6 text-center">
          Already have an account? <Link href="/login">Sign in</Link>
        </FieldDescription>
      </Field>
    </FieldGroup>
  </FieldGroup>
</form>

      </CardContent>
    </Card>
  );
}
