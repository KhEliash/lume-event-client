/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

const API_URL = process.env.NEXT_API_BASE_URL;

export const bookingAction = async (eventId: string, guestCount: number = 1) => {
    console.log(eventId,guestCount);
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "Authentication token missing.",
      };
    }

    const res = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event: eventId,
       guestCount: guestCount,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to create booking.",
      };
    }

    return {
      success: true,
      message: result.message || "Booking successful!",
      result: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something went wrong.",
    };
  }
};

// booking for event 
