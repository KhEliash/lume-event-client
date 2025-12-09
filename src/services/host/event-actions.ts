/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_API_BASE_URL;

interface ActionResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const createEventAction = async (
  _currentState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "No access token found. Please log in.",
      };
    }

    const res = await fetch(`${API_URL}/events/create`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || `Failed to create event`,
      };
    }

    revalidatePath("/events");

    return {
      success: true,
      message: "Event created successfully!",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Event creation failed:", error);
    return {
      success: false,
      message: `An unexpected error occurred: ${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Please try again."
      }`,
    };
  }
};
