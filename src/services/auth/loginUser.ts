// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";

// import { cookies } from "next/headers";
// import z from "zod";

// const loginValidationZodSchema = z.object({
//   email: z.email({
//     message: "Email is required",
//   }),
//   password: z
//     .string("Password is required")
//     .min(6, {
//       error: "Password is required and must be at least 6 characters long",
//     })
//     .max(100, {
//       error: "Password must be at most 100 characters long",
//     }),
// });

// const API_URL = process.env.NEXT_API_BASE_URL;

// export const loginUser = async (
//   _currentState: any,
//   formData: any
// ): Promise<any> => {
//   try {
//     const loginData = {
//       email: formData.get("email"),
//       password: formData.get("password"),
//     };

//     const validatedFields = loginValidationZodSchema.safeParse(loginData);

//     if (!validatedFields.success) {
//       return {
//         success: false,
//         errors: validatedFields.error.issues.map((issue) => {
//           return {
//             field: issue.path[0],
//             message: issue.message,
//           };
//         }),
//       };
//     }

//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(loginData),
//     });

//     const result = await res.json();

//     if (result?.data?.accessToken) {
//       (await cookies()).set("accessToken", result.data.accessToken, {
//         httpOnly: true,
//         secure: true,
//         sameSite: "lax",
//         path: "/",

//         maxAge: 60 * 60 * 24 * 7,
//       });
//     }

//     return result;
//   } catch (error) {
//     console.log(error);
//     return { error: "Login failed" };
//   }
// };




/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import z from "zod";

const loginValidationZodSchema = z.object({
  email: z.email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password is required and must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" }),
});

const API_URL = process.env.NEXT_API_BASE_URL;

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
  try {
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Validate input
    const validatedFields = loginValidationZodSchema.safeParse(loginData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => ({
          field: issue.path[0],
          message: issue.message,
        })),
      };
    }

    // Send login request to backend
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData),
    });

    const result = await res.json();

    // If login successful, store token in httpOnly cookie
    if (result?.data?.accessToken) {
      const cookieStore = cookies();
      (await cookieStore).set("accessToken", result.data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    return result;
  } catch (error) {
    console.error("Login failed:", error);
    return { success: false, error: "Login failed" };
  }
};
