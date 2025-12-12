"use server";

import { cookies } from "next/headers";
// import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_API_BASE_URL;


// Fetch all users with pagination and role filter
export const getAllUsers = async (page = 1, limit = 10, role = "user") => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Authentication token missing.", users: [] };
  }

  try {
    const res = await fetch(`${API_URL}/users/all?page=${page}&limit=${limit}&role=${role}`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const users = await res.json();

    if (!res.ok) {
      const message = users?.message || `Failed to fetch users. Status: ${res.status}`;
      console.error("Fetch Error:", message);
      return { success: false, message, users: [] };
    }

    return { success: true, message: "Successfully fetched users.", users };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Network/Parsing Error:", message);
    return { success: false, message, users: [] };
  }
};


// Activate a user by ID
export const activateUser = async (userId: string) => {
  if (!userId) {
    return { success: false, message: "User ID is required." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Authentication token missing." };
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "PATCH", // assuming activation is a PUT request
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ active: true }), // assuming the API expects this payload
    });

    const result = await res.json();

    if (!res.ok) {
      const message = result?.message || `Failed to activate user. Status: ${res.status}`;
      console.error("Fetch Error:", message);
      return { success: false, message };
    }

    return { success: true, message: "User successfully activated.", user: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Network/Parsing Error:", message);
    return { success: false, message };
  }
};

// Deactivate a user by ID
export const deactivateUser = async (userId: string) => {
  if (!userId) {
    return { success: false, message: "User ID is required." };
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, message: "Authentication token missing." };
  }

  try {
    const res = await fetch(`${API_URL}/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();

    if (!res.ok) {
      const message = result?.message || `Failed to deactivate user. Status: ${res.status}`;
      console.error("Fetch Error:", message);
      return { success: false, message };
    }

    return { success: true, message: "User successfully deactivated.", user: result };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Network/Parsing Error:", message);
    return { success: false, message };
  }
};

