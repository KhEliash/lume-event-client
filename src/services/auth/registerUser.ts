/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

const API_URL = process.env.NEXT_API_BASE_URL;

export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const registerData = {
      password: formData.get("password"),
      email: formData.get("email"),
      fullName: formData.get("name"),
      role:formData.get("role")
    };

    const res = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const result = await res.json();
    // console.log(res);
    // if (result.success) {
    //     await loginUser(_currentState, formData);
    // }

    return result;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
