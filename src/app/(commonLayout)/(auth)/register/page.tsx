import { SignupForm } from "@/components/signup-form";

const RegisterPage = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[radial-gradient(circle_at_bottom_right,var(--tw-gradient-stops))] from-emerald-950 via-emerald-900 to-emerald-950">
      <div className="w-full max-w-sm relative">
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-400 opacity-10 blur-3xl rounded-full" />
        <SignupForm />
      </div>
    </div>
  );
};

export default RegisterPage;
