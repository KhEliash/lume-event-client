import { LoginForm } from "@/components/login-form";

const Login = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-emerald-950 via-emerald-900 to-emerald-950">
      <div className="w-full max-w-sm relative">
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-amber-400 opacity-20 blur-3xl rounded-full" />
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
