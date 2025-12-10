"use server"
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
    console.error("Network/Parsing Error during hosted events fetch:", error);
    return {
      success: false,
      message: `An unexpected error occurred: ${
        error instanceof Error ? error.message : String(error)
      }`,
      events: [],
    };
  }
};
