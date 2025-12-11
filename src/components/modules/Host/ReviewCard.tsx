/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { format } from "date-fns";

export function ReviewCard({ review, key }: { review: any; key: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4" key={key}>
        <CardContent className="p-0 space-y-3">
          {/* Header: Avatar + name + edit */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={review.reviewer.profileImage || ""} />
                <AvatarFallback>
                  {review.reviewer.fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {review.reviewer.fullName}
                </span>
                <span className="text-xs text-gray-500">
                  {format(new Date(review.createdAt), "PPpp")}
                </span>
              </div>
            </div>

            {/* {onEdit && (
            <button
              onClick={onEdit}
              className="text-xs text-blue-600 hover:underline"
            >
              Edit
            </button>
          )} */}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={18}
                className={`${
                  i < review.rating
                    ? "fill-yellow-400 stroke-yellow-400"
                    : "stroke-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Comment */}
          <p className="text-gray-700 text-sm leading-relaxed">
            {review.comment}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
