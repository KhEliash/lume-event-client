/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
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
import {
  Trash2,
  Star,
  Calendar,
  Zap,
  User as UserIcon,
  Quote,
} from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteReviewAction } from "@/services/review/review-actions";
import { UpdateReviewDialog } from "./UpdateReviewDialog";

const StarDisplay = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "text-amber-500 fill-amber-500"
              : "text-emerald-950/10"
          }
        />
      ))}
    </div>
  );
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function HostReviewList({ reviews }: { reviews: any[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (reviewId: string) => {
    startTransition(async () => {
      const res = await deleteReviewAction(reviewId);
      if (res.success) toast.success("Transmission deleted.");
      else toast.error("Failed to delete review.");
    });
  };

  if (!reviews || reviews.length === 0)
    return (
      <div className="w-full border-4 border-dashed border-emerald-950/20 py-20 text-center">
        <p className="text-emerald-950/40 font-black uppercase tracking-widest text-sm">
          No feedback signals received yet.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="relative bg-white border-2 border-emerald-950 p-6 md:p-8 flex flex-col justify-between hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] transition-all group"
        >
          {/* Action Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 border-2 border-emerald-950 overflow-hidden bg-emerald-50">
                {review.reviewer.profileImage ? (
                  <Image
                    src={review.reviewer.profileImage}
                    alt={review.reviewer.fullName}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-emerald-950/20">
                    <UserIcon size={24} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 leading-none mb-1">
                  Participant
                </p>
                <h3 className="font-black text-lg text-emerald-950 uppercase tracking-tighter">
                  {review.reviewer.fullName}
                </h3>
                <StarDisplay rating={review.rating} />
              </div>
            </div>

            <div className="flex gap-2">
              <UpdateReviewDialog
                reviewId={review._id}
                defaultValues={{
                  rating: review.rating,
                  comment: review.comment,
                }}
              />

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-none border-2 border-emerald-950 hover:bg-red-50 text-red-600"
                  >
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-none border-4 border-emerald-950">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="font-black uppercase tracking-tighter text-2xl">
                      Confirm Deletion
                    </AlertDialogTitle>
                    <AlertDialogDescription className="font-medium italic">
                      This feedback transmission will be permanently removed.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-none font-bold uppercase tracking-widest">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(review._id)}
                      disabled={isPending}
                      className="rounded-none bg-red-600 text-white font-black uppercase tracking-widest border-2 border-emerald-950"
                    >
                      {isPending ? "Erasing..." : "Delete"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          {/* Comment Block */}
          <div className="relative mb-6">
            <Quote
              className="absolute -top-2 -left-2 text-emerald-950/5"
              size={40}
            />
            <p className="text-lg text-emerald-900/80 leading-relaxed font-medium italic relative z-10 pl-4 border-l-2 border-amber-400">
              &quot;{review.comment}&quot;
            </p>
          </div>

          {/* Metadata Footer */}
          <div className="mt-auto pt-6 border-t-2 border-emerald-950 border-dotted grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase text-emerald-950/40 tracking-widest">
                Event Source
              </span>
              <div className="flex items-center gap-2 text-emerald-950 font-black uppercase text-xs truncate">
                <Zap size={12} className="text-amber-500 shrink-0" />
                <span className="truncate">{review.event.name}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black uppercase text-emerald-950/40 tracking-widest">
                Mission Date
              </span>
              <div className="flex items-center gap-2 text-emerald-950 font-black uppercase text-xs">
                <Calendar size={12} className="text-amber-500" />
                <span>{formatDate(review.event.date)}</span>
              </div>
            </div>
            <div className="col-span-2 text-[9px] font-bold text-emerald-950/30 uppercase tracking-[0.2em] text-center pt-2">
              Feedback Logged: {formatDate(review.createdAt)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
