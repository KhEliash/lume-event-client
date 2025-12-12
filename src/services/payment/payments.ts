"use server";

 import { cookies } from "next/headers";

const API_URL = process.env.NEXT_API_BASE_URL;


export const getMyPayments = async (
 ) => {
  
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication token missing.",
        reviews: [],
      };
    }
    const res = await fetch(
      `${API_URL}/payment/my-payments`,
      {
        method: "GET",
        headers: { Authorization: token },
        cache: "no-store",
      }
    );

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch reviews.",
      };
    }

    return {
      success: true,
      message: result.message || "Reviews fetched successfully",
      reviews: result.data || [],
       
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
