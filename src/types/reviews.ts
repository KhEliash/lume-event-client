/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Review {
  _id: string;
  event: {
    _id: string;
    name: string;
    type: string;
    date: string;
  };
  reviewer: {
    _id: string;
    fullName: string;
    profileImage?: string | null;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface HostReviewsResponse {
  success: boolean;
  message: string;
  reviews?: Review[] | any;
  page?: number;
  limit?: number;
  total?: number;
}