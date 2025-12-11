/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  Star,
  Zap,
} from "lucide-react";

// --- Helper Functions ---

const formatEventDate = (dateString: string, timeString: string) => {
  try {
    const datePart = dateString.split("T")[0]; // Result: "2024-12-15"

    const combinedDateTimeString = `${datePart} ${timeString}`;

    const dateObj = new Date(combinedDateTimeString);

    // Final check for validity
    if (isNaN(dateObj.getTime())) {
      return { date: "Date N/A", time: "Time N/A" };
    }

    return {
      // Options for formatting
      date: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: dateObj.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
  } catch (e) {
    console.error("Error formatting date/time:", e);
    return { date: "Error", time: "Error" };
  }
};

const getStatusBadge = (status: string) => {
  switch (status?.toLowerCase()) {
    case "active":
      return { text: "Active", color: "bg-green-500 hover:bg-green-600" };
    case "completed":
      return { text: "Completed", color: "bg-gray-500 hover:bg-gray-600" };
    case "cancelled":
      return { text: "Cancelled", color: "bg-red-500 hover:bg-red-600" };
    default:
      return { text: "Pending", color: "bg-yellow-500 hover:bg-yellow-600" };
  }
};

export const EventCard = ({ event }: any) => {
  const { date, time } = formatEventDate(event.date, event.time);
  const statusBadge = getStatusBadge(event.status);
//   console.log(event);

  return (
    <Link href={`/event/${event._id}`} passHref>
      <Card className="flex py-0 flex-col h-full hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer overflow-hidden ">
        {/* Event Image */}
        <div className="relative w-full h-40 bg-gray-100 overflow-hidden">
          {/* Status Badge Overlay */}
          <Badge
            className={`absolute top-2 right-2 z-10 ${statusBadge.color} text-white font-semibold`}
          >
            {statusBadge.text}
          </Badge>

          {event.eventImage ? (
            <Image
              src={event.eventImage}
              alt={event.name}
              priority={false} // Set to true if this is above the fold
              style={{ objectFit: "cover" }}
              fill
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
              <Zap className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Card Content */}
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl font-bold line-clamp-2 text-gray-900 leading-tight">
            {event.name}
          </CardTitle>
          <Badge
            variant="secondary"
            className="w-fit mt-1 text-xs font-medium capitalize"
          >
            {event.type}
          </Badge>
        </CardHeader>

        <CardContent className="flex-1 p-4 pt-0 space-y-2 text-sm text-gray-600">
          {/* Description */}
          <p className="line-clamp-2 text-sm text-gray-700">
            {event.description}
          </p>

          <div className="space-y-1 pt-1">
            {/* Location */}
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-500 shrink-0" />
              <span className="truncate">
                {event.location?.address || event.location?.city}
              </span>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-indigo-500 shrink-0" />
                <span className="font-medium text-gray-800">{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-indigo-500 shrink-0" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </CardContent>

        {/* Card Footer: Host, Participants, Fee */}
        <CardFooter className="p-4 pt-0 flex justify-between items-end border-t border-gray-100">
          {/* Host Info */}
          <div className="flex flex-col text-xs text-gray-500">
            <span className="font-semibold">Hosted by:</span>
            <div className="flex items-center gap-1">
              <span className="text-gray-800 font-medium truncate max-w-[100px]">
                {event.host?.fullName || "N/A"}
              </span>
              {event.host?.rating > 0 && (
                <div className="flex items-center text-yellow-500">
                  <Star size={12} className="fill-yellow-500" />
                  <span className="ml-0.5 text-xs text-gray-700 font-medium">
                    {event.host?.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Participants & Fee */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-center text-sm font-semibold text-gray-700">
              <Users size={16} className="mr-1 text-teal-500" />
              {event.currentParticipants || 0} / {event.maxParticipants}
            </div>
            <div className="flex items-center text-sm font-bold text-blue-600">
              <DollarSign size={16} className="mr-0.5" />
              {event.joiningFee > 0
                ? `$${event.joiningFee.toFixed(0)}`
                : "FREE"}
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
