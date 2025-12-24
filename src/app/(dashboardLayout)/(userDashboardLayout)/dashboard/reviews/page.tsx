import HostReviewList from "@/components/modules/Host/HostReviewList";
import { getHostReviews } from "@/services/review/review-actions";
import { getMe } from "@/services/user/userprofile";
import React from "react";

const Reviews = async () => {
  const Me = await getMe();
  const myReviews = await getHostReviews(Me.result._id);

  return (
    <div className="min-h-screen w-full p-4 md:p-10 space-y-8">
      <div className="border-b-4 border-emerald-950 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">
            Participant Debriefs
          </h1>
          <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">
            Reviews and feedback from your hosted events
          </p>
        </div>
        <div className="bg-emerald-950 text-amber-400 px-4 py-2 font-black text-sm uppercase tracking-widest border-2 border-emerald-950">
          Total: {myReviews.reviews?.length || 0}
        </div>
      </div>

      <HostReviewList reviews={myReviews.reviews} />
    </div>
  );
};

export default Reviews;
