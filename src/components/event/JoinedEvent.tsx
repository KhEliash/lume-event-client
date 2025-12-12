/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Wallet,
  User as UserIcon,
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
      <div className="w-full text-center py-10 text-gray-500 text-lg">
        No joined events found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {data.map((event) => (
        <div
          key={event._id}
          className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-all bg-white overflow-hidden"
        >
          {/* Event Image */}
          <div className="w-full h-52 bg-gray-100">
            {" "}
            {/* Fixed height */}
            {event.eventImage ? (
              <div className="w-full h-48 overflow-hidden rounded-lg">
                <Image
                  src={event.eventImage}
                  alt={event.name}
                  width={600} // arbitrary, larger than card for quality
                  height={300} // keep ratio
                  className="w-full h-full object-fill"
                />
              </div>
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 rounded-lg">
                No Image Available
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Title */}
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {event.name}
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4">{event.description}</p>

            {/* Date & Time */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{event.time}</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <MapPin size={16} />
              <span>
                {event.location?.address}, {event.location?.city}
              </span>
            </div>

            {/* Joining Fee */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <Wallet size={16} />
              <span>
                Joining Fee:{" "}
                {event.joiningFee > 0 ? (
                  <span className="font-semibold">{event.joiningFee} Taka</span>
                ) : (
                  <span className="font-semibold">Free</span>
                )}
              </span>
            </div>

            {/* Participants */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-3">
              <Users size={16} />
              <span>
                {event.currentParticipants}/{event.maxParticipants} Participants
              </span>
            </div>

            {/* Status */}
            <span
              className={`inline-block px-3 py-1 text-xs rounded-full ${
                event.status === "open"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {event.status.toUpperCase()}
            </span>

            {/* Host */}
            <div className="flex items-center gap-3 mt-5 w-full justify-between">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {event.host?.profileImage ? (
                  <Image
                    src={event.host.profileImage}
                    alt="Host"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={20} className="text-gray-500" />
                )}
              </div>
              <p className="text-sm text-gray-700">
                Hosted by{" "}
                <span className="font-semibold">{event.host?.fullName}</span>
              </p>
              <div className="grid items-end">
                <Link href={`/event/${event._id}`}>
                  <Button className="bg-blue-500 cursor-pointer">View</Button>
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
