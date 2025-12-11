/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { HostReviewsResponse } from "@/types/reviews";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_API_BASE_URL;

// Host reviews
export const getHostReviews = async (
  hostId: string,
  page: number = 1,
  limit: number = 10
): Promise<HostReviewsResponse> => {
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
      `${API_URL}/reviews/host/${hostId}?page=${page}&limit=${limit}`,
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
      page: result.meta?.page,
      limit: result.meta?.limit,
      total: result.meta?.total,
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

// delete
export async function deleteReviewAction(reviewId: string) {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: token || "",
      },
    });

    const result = await res.json();

    return {
      success: res.ok,
      message: result.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// update
export async function updateReviewAction(
  reviewId: string,
  data: { rating: number; comment: string }
) {
  try {
    const token = (await cookies()).get("accessToken")?.value;

    const res = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        Authorization: token || "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    return {
      success: res.ok,
      message: result.message,
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

// get event reviews
export const getEventReviews = async (
  eventId: string
): Promise<HostReviewsResponse> => {
  try {
    const res = await fetch(`${API_URL}/reviews/event/${eventId} `, {
      method: "GET",
      // headers: { Authorization: token },
      cache: "no-store",
    });

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
