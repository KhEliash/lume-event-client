"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutUser = async () => {
  const cookieStore = cookies();

  // Delete accessToken cookie
  (
    await // Delete accessToken cookie
    cookieStore
  ).set({
    name: "accessToken",
    value: "",
    path: "/",
    expires: new Date(0), // Immediately expired
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });

  // Redirect the user
  redirect("/login");
};
