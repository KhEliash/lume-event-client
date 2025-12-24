/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Quote } from "lucide-react";
import { format } from "date-fns";

export function ReviewCard({ review }: { review: any; key?: number }) {
  // Brutalist Design Tokens
  const cardContainer =
    "relative bg-white border-4 border-emerald-950 p-6 shadow-[6px_6px_0px_0px_rgba(6,78,59,1)] hover:shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] transition-all duration-200";
  const dateLabel =
    "text-[10px] font-black uppercase tracking-tighter text-emerald-900/50 italic";

  return (
    <div className={cardContainer}>
      {/* Decorative Amber Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 bg-amber-400 border-b-4 border-l-4 border-emerald-950 flex items-center justify-center">
        <Quote size={14} className="text-emerald-950 fill-emerald-950" />
      </div>

      <div className="space-y-4">
        {/* Header: Identity */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-12 w-12 rounded-none border-2 border-emerald-950 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)]">
              <AvatarImage
                src={review.reviewer.profileImage || ""}
                className="object-cover"
              />
              <AvatarFallback className="rounded-none bg-emerald-100 font-black text-emerald-950">
                {review.reviewer.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-black uppercase italic tracking-tight text-emerald-950">
              {review.reviewer.fullName}
            </span>
            <span className={dateLabel}>
              {format(new Date(review.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
        </div>

        {/* Separator Line */}
        <div className="h-0.5 w-full bg-emerald-950/10" />

        {/* Rating Section */}
        <div className="flex items-center gap-1 bg-emerald-50 w-fit px-2 py-1 border border-emerald-950/20">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={`${
                i < review.rating
                  ? "fill-amber-500 stroke-emerald-950"
                  : "stroke-emerald-950/20 fill-transparent"
              }`}
              strokeWidth={3}
            />
          ))}
          <span className="ml-2 text-[10px] font-black text-emerald-950">
            {review.rating}.0
          </span>
        </div>

        {/* Comment Body */}
        <div className="relative">
          <p className="text-emerald-900 text-sm font-bold leading-relaxed italic border-l-2 border-amber-400 pl-4 py-1">
            &quot;{review.comment}&quot;
          </p>
        </div>
      </div>
    </div>
  );
}
