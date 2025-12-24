"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Users, Zap, ArrowUpRight } from "lucide-react";

// --- Helper Functions ---
const formatEventDate = (dateString: string, timeString: string) => {
  try {
    const datePart = dateString.split("T")[0];
    const combinedDateTimeString = `${datePart} ${timeString}`;
    const dateObj = new Date(combinedDateTimeString);

    if (isNaN(dateObj.getTime())) {
      return { date: "Date N/A", time: "Time N/A" };
    }

    return {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return { date: "Error", time: "Error" };
  }
};

const getStatusStyles = (status: string) => {
  switch (status?.toLowerCase()) {
    case "open":
      return "bg-emerald-500 text-white border-emerald-950";
    case "completed":
      return "bg-amber-400 text-emerald-950 border-emerald-950";
    default:
      return "bg-red-500 text-white border-emerald-950";
  }
};

export const EventCard = ({ event }: any) => {
  const { date, time } = formatEventDate(event.date, event.time);
  const statusClass = getStatusStyles(event.status);

  return (
    <Link href={`/event/${event._id}`} className="group block h-full">
      <article className="relative flex flex-col h-full bg-white border-2 border-emerald-950 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
        {/* Image Section */}
        <div className="relative w-full h-48 border-b-2 border-emerald-950 bg-emerald-50 overflow-hidden">
          {/* Status Badge */}
          <div
            className={`absolute top-0 right-0 z-10 px-4 py-1 border-l-2 border-b-2 font-black uppercase text-[10px] tracking-widest ${statusClass}`}
          >
            {event.status === "open" ? "Live Pulse" : event.status}
          </div>

          {event.eventImage ? (
            <Image
              src={event.eventImage}
              alt={event.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-emerald-950/20">
              <Zap size={48} strokeWidth={2.5} />
            </div>
          )}

          {/* Pricing Overlay */}
          <div className="absolute bottom-0 left-0 bg-amber-400 border-t-2 border-r-2 border-emerald-950 px-3 py-1 font-black text-emerald-950 text-sm">
            {event.joiningFee > 0 ? `$${event.joiningFee}` : "FREE ENTRY"}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-600">
              {event.type}
            </span>
            <h3 className="text-xl font-black text-emerald-950 uppercase tracking-tighter leading-none group-hover:text-emerald-700 transition-colors line-clamp-2">
              {event.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-2 text-xs font-bold text-emerald-950/60 uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-amber-500" />
              <span className="truncate">
                {event.location?.city || "Remote"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-emerald-800" />
              <span>
                {date} • {time}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="px-5 py-4 border-t-2 border-emerald-950/10 flex items-center justify-between bg-emerald-50/30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-950 flex items-center justify-center text-[10px] text-white font-bold">
              {event.host?.fullName?.charAt(0) || "H"}
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-950/40">
              {event.host?.fullName?.split(" ")[0]}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-950">
            <Users size={14} strokeWidth={2.5} />
            <span className="text-xs font-black">
              {event.currentParticipants || 0}/{event.maxParticipants}
            </span>
            <ArrowUpRight
              size={14}
              className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
      </article>
    </Link>
  );
};
