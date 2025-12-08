import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/module/ui/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        <h1>Hello</h1>
        <Button>Click me</Button>
      </div>
    </>
  );
}
