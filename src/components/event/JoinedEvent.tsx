/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  User as UserIcon,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

interface JoinedEventProps {
  data: any[];
}

const JoinedEvent: React.FC<JoinedEventProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full border-4 border-dashed border-emerald-950/20 py-20 text-center">
        <p className="text-emerald-950/40 font-black uppercase tracking-widest text-sm">
          No transmissions found. Join an event to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {data.map((event) => (
        <div
          key={event._id}
          className="group relative bg-white border-2 border-emerald-950 hover:shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] transition-all duration-300"
        >
          {/* Status Badge - Floating */}
          <div
            className={`absolute top-4 right-4 z-10 px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 border-emerald-950 ${
              event.status === "open"
                ? "bg-amber-400 text-emerald-950"
                : "bg-red-500 text-white"
            }`}
          >
            {event.status}
          </div>

          <div className="flex flex-col md:flex-row h-full">
            {/* Image Section */}
            <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-emerald-950 bg-emerald-50">
              {event.eventImage ? (
                <Image
                  src={event.eventImage}
                  alt={event.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-emerald-950/20">
                  <UserIcon size={40} />
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter leading-none mb-2">
                  {event.name}
                </h2>
                <p className="text-sm text-emerald-900/70 line-clamp-2 font-medium italic">
                  &quot;{event.description}&quot;
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 border-t border-emerald-950/10 pt-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-950/60">
                  <Calendar size={14} className="text-amber-500" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-950/60">
                  <Clock size={14} className="text-amber-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-950/60 col-span-2">
                  <MapPin size={14} className="text-amber-500" />
                  <span className="truncate">{event.location?.city}</span>
                </div>
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-4 border-t-2 border-emerald-950 border-dotted">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-emerald-950 overflow-hidden bg-emerald-100">
                    {event.host?.profileImage ? (
                      <Image
                        src={event.host.profileImage}
                        width={32}
                        height={32}
                        alt="H"
                      />
                    ) : (
                      <UserIcon size={16} className="m-2" />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-950">
                    {event.host?.fullName?.split(" ")[0]}
                  </span>
                </div>

                <Link href={`/event/${event._id}`}>
                  <Button className="rounded-none bg-emerald-950 text-amber-400 hover:bg-amber-400 hover:text-emerald-950 font-black uppercase text-[10px] tracking-widest h-9 border-2 border-emerald-950 transition-colors">
                    View <ArrowRight size={14} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinedEvent;
