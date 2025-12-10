import HostReviewList from "@/components/modules/Host/HostReviewList";
import { getHostReviews } from "@/services/review/review-actions";
 import { getMe } from "@/services/user/getMe";
import React from "react";

const Reviews = async () => {
  const Me = await getMe();

  const myReviews = await getHostReviews(Me.result._id);

  return (
    <div className="min-h-svh w-full p-6 md:p-10">
      <h1 className="text-2xl text-center font-bold mb-6">My Reviews</h1>

      <HostReviewList reviews={myReviews.reviews} />
    </div>
  );
};

export default Reviews;
