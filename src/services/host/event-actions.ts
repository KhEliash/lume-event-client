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

// create event
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

// my hosted events
export const myHostedEvents = async () => {
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
    const res = await fetch(`${API_URL}/events/hosted`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      // cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      const errorMessage =
        result.message || `Failed to fetch events. Status: ${res.status}`;
      console.error("Fetch Error:", errorMessage);

      return {
        success: false,
        message: errorMessage,
        result,
      };
    }

    return {
      success: true,
      message: "Successfully fetched hosted events.",
      events: result,
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

// event by id
export const eventById = async (id: string) => {
  try {
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // optional
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch event.",
        event: null,
      };
    }

    return {
      result: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${
        error instanceof Error ? error.message : String(error)
      }`,
      event: null,
    };
  }
};

// update event
export const updateEventAction = async (
  _currentState: ActionResponse,
  eventId: string,
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

    // 2️⃣ Send PATCH request to backend
    const res = await fetch(`${API_URL}/events/${eventId}`, {
      method: "PATCH",
      body: formData,
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update event.",
      };
    }

    // 3️⃣ Revalidate relevant paths (optional)
    revalidatePath("/host/dashboard/hosted-events"); // adjust if needed
    revalidatePath(`/host/dashboard/event/${eventId}`);

    return {
      success: true,
      message: "Event updated successfully!",
      data: result.data,
    };
  } catch (error: any) {
    console.error("Event update failed:", error);
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

// delete event
export const deleteEvent = async (id: string) => {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("accessToken")?.value;

    if (!token) {
      return {
        success: false,
        message: "No access token found. Please log in.",
      };
    }
    const res = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to delete event.",
      };
    }
    revalidatePath("/host/dashboard/hosted-events");

    return {
      success: true,
      message: result.message || "Event deleted successfully.",
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
