/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { eventById } from "@/services/host/event-actions";
import Link from "next/link";

import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  ChevronLeft,
  Zap,
  Star,
  Activity,
  AlertTriangle,
} from "lucide-react";

// --- UTILITY FUNCTIONS ---
const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatFee = (fee: number): string => {
  return fee === 0 ? "Free" : `$${fee}`;
};

const getStatusClasses = (status: string): string => {
  switch (status.toLowerCase()) {
    case "open":
      return "bg-green-100 text-green-700 border-green-300";
    case "full":
      return "bg-yellow-100 text-yellow-700 border-yellow-300";
    case "closed":
      return "bg-gray-100 text-gray-700 border-gray-300";
    default:
      return "bg-red-100 text-red-700 border-red-300";
  }
};

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const result = await eventById(id);

  // Cast for easier access and type clarity
  const { success, event, message } = result as any;

  if (!success || !event || !event.data) {
    return (
      <div className="text-red-500 p-10 text-center font-semibold border-2 border-red-300 rounded-xl bg-red-50">
        <AlertTriangle className="w-5 h-5 inline mr-2" /> Error:{" "}
        {message || "Event not found."}
      </div>
    );
  }

  const events = event.data;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Back Button */}
      <Link
        href="/host/dashboard"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Dashboard
      </Link>

      {/* --- Section 1: Banner and Title Block --- */}
      <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
        {events.eventImage ? (
          <Image
            src={events.eventImage}
            alt={events.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg">
            No Image Available
          </div>
        )}

        {/* Title and Badges Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            {events.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusClasses(
                events.status
              )}`}
            >
              {events.status.toUpperCase()}
            </span>
            <span className="bg-blue-600/90 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
              <Activity className="w-3 h-3 mr-1" />
              {events.type.toUpperCase().replace(/_/g, " ")}
            </span>
          </div>
        </div>
      </div>

      {/* --- Section 2: Main Content (Details, Host, Description) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Main Description and Key Details) - 2/3 width */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-3 text-gray-800 border-b pb-2">
              Event Description
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {events.description}
            </p>
          </div>

          {/* Key Details Card */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Key Information
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-500">Date</p>
                  <p className="font-semibold text-gray-800">
                    {formatDate(events.date)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-500">Time</p>
                  <p className="font-semibold text-gray-800">{events.time}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Joining Fee</p>
                  <p className="font-bold text-green-700">
                    {formatFee(events.joiningFee)}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-gray-500">Participants</p>
                  <p className="font-semibold text-gray-800">
                    {events.currentParticipants} / {events.maxParticipants}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-red-500" />
                <div className="truncate">
                  <p className="text-xs text-gray-500">Location</p>
                  <p
                    className="font-semibold text-gray-800 truncate"
                    title={`${events.location.address}, ${events.location.city}`}
                  >
                    {events.location.city}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">
              Capacity & Requirements
            </h2>
            <div className="flex gap-6">
              <p className="text-gray-700 flex items-center">
                <Users className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-semibold">Min Participants:</span>{" "}
                {events.minParticipants}
              </p>
              <p className="text-gray-700 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-500" />
                <span className="font-semibold">Event Status:</span>
                <span
                  className={`ml-1 ${
                    events.isActive ? "text-green-600" : "text-red-600"
                  } font-bold`}
                >
                  {events.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
          {/* Host Card */}
          <div className="bg-white p-6 rounded-xl shadow-xl border border-gray-100 sticky top-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 border-b pb-2">
              Hosted By
            </h2>

            <div className="flex items-center space-x-4">
              {events.host.profileImage ? (
                <Image
                  src={events.host.profileImage}
                  alt={events.host.fullName}
                  width={64}
                  height={64}
                  className="rounded-full object-cover border-2 border-blue-400"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl border-2 border-blue-400">
                  {events.host.fullName[0]}
                </div>
              )}

              <div>
                <p className="font-extrabold text-lg text-gray-900">
                  {events.host.fullName}
                </p>
                <div className="flex items-center text-sm text-yellow-500">
                  <Star className="w-4 h-4 mr-1" fill="currentColor" />
                  <span className="text-gray-600 ml-1">
                    {events.host.rating || "No Rating"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-4 border-t pt-4">
              &quot;{events.host.bio || "Host has not provided a bio."}&quot;
            </p>
          </div>

          {/* Action Buttons */}
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-40">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">
              Participants
            </h2>

            <div className="flex flex-col gap-4">
              <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center">
                <Users className="w-5 h-5 mr-2" />({events.participants.length})
              </button>

              <div className="text-xs text-gray-400 mt-4 text-center border-t pt-3">
                Created: {new Date(events.createdAt).toLocaleDateString()} |
                Updated: {new Date(events.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
