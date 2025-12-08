 // src/components/shared/Navbar.tsx
import { cookies } from "next/headers";
import NavClient from "./NavClient";
 
export default async function Navbar() {
  const accessToken = (await cookies()).get("accessToken")?.value || null;

  return <NavClient isLoggedIn={!!accessToken} />;
}
