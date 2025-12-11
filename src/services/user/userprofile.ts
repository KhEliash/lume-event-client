/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_API_BASE_URL;

// get me
export const getMe = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      message: "Authentication token missing.",
      events: [],
    };
  }

  try {
    const res = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
      // cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage =
        result.message || `Failed to fetch user. Status: ${res.status}`;
      console.error("Fetch Error:", errorMessage);

      return {
        success: false,
        message: errorMessage,
        result,
      };
    }

    return {
      success: true,
      message: "Successfully fetched user.",
      result: result.data,
    };
  } catch (error) {
    console.error("Network/Parsing Error during fetch:", error);
    return {
      success: false,
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};

// update profile
export const updateProfileAction = async (userId: string, data: any) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication token missing.",
      };
    }

    const res = await fetch(`${API_URL}/users/update`, {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return {
      success: res.ok,
      message:
        result.message || (res.ok ? "Profile updated" : "Failed to update"),
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unexpected error while updating profile",
    };
  }
};
