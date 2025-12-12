 // src/components/shared/Navbar.tsx
import { cookies } from "next/headers";
import NavClient from "./NavClient";
 
export default async function NavBar() {
  const accessToken = (await cookies()).get("accessToken")?.value || null;

  return <NavClient isLoggedIn={!!accessToken} />;
}
