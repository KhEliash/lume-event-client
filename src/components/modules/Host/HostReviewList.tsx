/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Trash2, Star, Calendar, Zap, User as UserIcon } from "lucide-react"; // Added UserIcon, Calendar, Zap
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteReviewAction } from "@/services/review/review-actions";
import { UpdateReviewDialog } from "./UpdateReviewDialog";

// Utility to display full/empty stars
const StarDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

// Utility to format date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function HostReviewList({ reviews }: { reviews: any[] }) {
  const [isPending, startTransition] = useTransition();
  console.log(reviews); // Keep existing code structure

  const handleDelete = (reviewId: string) => {
    startTransition(async () => {
      const res = await deleteReviewAction(reviewId);
      if (res.success) toast.success("Review deleted!");
      else toast.error("Failed to delete review.");
    });
  };

  if (!reviews || reviews.length === 0)
    return (
      <p className="text-gray-500 p-4 border rounded-lg bg-gray-50">
        No reviews have been left by participants yet.
      </p>
    );

  return (
    <div className="space-y-6 grid md:grid-cols-2">
      {reviews.map((review) => (
        <Card
          key={review._id}
          className="shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-colors"
        >
          <CardContent className="p-6 flex flex-col">
            {/* TOP BAR: Reviewer Info & Actions */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-100 mb-4">
              {/* Reviewer Info */}
              <div className="flex items-center gap-4">
                {review.reviewer.profileImage ? (
                  <Image
                    src={review.reviewer.profileImage}
                    alt={review.reviewer.fullName}
                    width={56}
                    height={56}
                    className="rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                    {review.reviewer.fullName[0]}
                  </div>
                )}

                <div>
                  <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                    <UserIcon size={18} className="text-blue-500" />
                    {review.reviewer.fullName}
                  </h3>

                  {/* Star Rating */}
                  <StarDisplay rating={review.rating} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {/* Update (Edit) - Optional for host, usually only reviewer can edit */}

                <UpdateReviewDialog
                  reviewId={review._id}
                  defaultValues={{
                    rating: review.rating,
                    comment: review.comment,
                  }}
                />

                {/* Delete (Confirmation Dialog) */}
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 size={16} /> Delete
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-xl">
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this review? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(review._id)}
                        disabled={isPending}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {isPending ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* COMMENT BODY */}
            <div className="py-2">
              <p className="text-gray-700 text-base italic leading-relaxed">
                &quot;{review.comment}&quot;
              </p>
            </div>

            {/* FOOTER: Event Details/Metadata */}
            <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 grid grid-cols-2 gap-2">
              <p className="flex items-center font-medium">
                <Zap size={14} className="text-indigo-500 mr-2" />
                <span className="font-semibold text-gray-600">Event: </span>
                <span className="ml-1 truncate" title={review.event.name}>
                  {review.event.name}
                </span>
              </p>

              <p className="flex items-center justify-end">
                <Calendar size={14} className="text-indigo-500 mr-2" />
                <span className="font-semibold text-gray-600">Date: </span>
                <span className="ml-1">{formatDate(review.event.date)}</span>
              </p>

              <p className="col-span-2 text-xs text-right text-gray-400">
                Reviewed on: {formatDate(review.createdAt)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
