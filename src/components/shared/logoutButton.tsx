"use client";

import { logoutUser } from "@/services/auth/logoutUser";
  import { Button } from "../ui/button";
import { useTransition } from "react";

const LogoutButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(() => {
      logoutUser();  
    });
  };

  return (
    <Button variant="outline" className="cursor-pointer" onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default LogoutButton;
