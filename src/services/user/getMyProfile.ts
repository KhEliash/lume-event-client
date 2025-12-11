"use server"
// import { cookies } from "next/headers";

const API_URL = process.env.NEXT_API_BASE_URL;

// get me
export const getMyProfile = async (id:string) => {
 

  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      method: "GET",
      headers: {
        // Authorization: token,

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
