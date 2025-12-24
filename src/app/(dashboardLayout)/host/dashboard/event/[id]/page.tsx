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
  Star,
  Activity,
  AlertTriangle,
  Layers,
} from "lucide-react";
import { getEventReviews } from "@/services/review/review-actions";
import { ReviewCard } from "@/components/modules/Host/ReviewCard";

// --- BRUTALIST UI TOKENS ---
const boxStyle =
  "border-4 border-emerald-950 bg-white shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]";
const headerBox =
  "border-4 border-emerald-950 shadow-[12px_12px_0px_0px_rgba(251,191,36,1)] bg-white overflow-hidden";
const labelStyle =
  "text-[10px] font-black uppercase tracking-widest text-emerald-900/60 mb-1 block";

const formatDate = (isoDate: string): string => {
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const formatFee = (fee: number): string => {
  return fee === 0 ? "FREE OF CHARGE" : `$${fee}`;
};

const getStatusClasses = (status: string): string => {
  const base =
    "px-4 py-1 text-xs font-black uppercase border-2 border-emerald-950 italic";
  switch (status.toLowerCase()) {
    case "open":
      return `${base} bg-emerald-400 text-emerald-950`;
    case "full":
      return `${base} bg-amber-400 text-emerald-950`;
    case "closed":
      return `${base} bg-slate-300 text-slate-700`;
    default:
      return `${base} bg-red-400 text-white`;
  }
};

export default async function EventDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const resultEvent = await eventById(id);
  const eventReviews = await getEventReviews(id);

  if (!resultEvent) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 border-4 border-emerald-950 bg-red-50 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex items-center gap-4">
        <AlertTriangle className="w-10 h-10 text-red-600" />
        <h2 className="text-xl font-black uppercase text-red-600 italic">
          Critical Error: Event Not Found
        </h2>
      </div>
    );
  }

  const events = resultEvent.data;

  return (
    <div className="  px-4 md:px-10 py-6  space-y-12 ">
      {/* Back Button */}
      <Link
        href="/host/dashboard"
        className="inline-flex items-center group font-black uppercase text-xs tracking-widest text-emerald-950"
      >
        <div className="bg-emerald-950 text-white p-1 mr-3 group-hover:bg-amber-500 transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </div>
        Return to Control Center
      </Link>

      {/* --- Section 1: Hero Block --- */}
      <div className={headerBox}>
        <div className="flex flex-col lg:flex-row h-full lg:h-[450px]">
          <div className="lg:w-3/5 relative h-64 lg:h-full border-b-4 lg:border-b-0 lg:border-r-4 border-emerald-950 bg-emerald-50">
            {events.eventImage ? (
              <Image
                src={events.eventImage}
                alt={events.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 800px"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-emerald-900/20 italic">
                <Layers size={64} />
                <p className="font-black uppercase text-sm mt-4">
                  No Asset Found
                </p>
              </div>
            )}
          </div>

          <div className="lg:w-2/5 p-8 flex flex-col justify-center bg-white">
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={getStatusClasses(events.status)}>
                {events.status}
              </span>
              <span className="px-4 py-1 text-xs font-black uppercase border-2 border-emerald-950 bg-amber-100 text-emerald-950 flex items-center">
                <Activity className="w-3 h-3 mr-2" />
                {events.type.replace(/_/g, " ")}
              </span>
            </div>

            <h1 className="text-5xl font-black uppercase tracking-tighter text-emerald-950 leading-[0.9] italic mb-6">
              {events.name}
            </h1>

            <div className="flex items-center gap-4 p-4 border-2 border-emerald-950 bg-emerald-50 italic font-bold text-emerald-900">
              <MapPin className="text-amber-500 shrink-0" />
              <span>
                {events.location.address}, {events.location.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 2: Main Content --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Side: Intel & Description (8 Columns) */}
        <div className="lg:col-span-8 space-y-10">
          <div className={boxStyle + " p-8"}>
            <h2 className="text-2xl font-black uppercase italic text-emerald-950 mb-6 border-b-4 border-amber-400 inline-block">
              Intel Description
            </h2>
            <p className="text-emerald-900 font-medium leading-relaxed whitespace-pre-wrap first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-amber-500">
              {events.description}
            </p>
          </div>

          {/* Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              className={
                boxStyle + " p-6 flex gap-4 items-center bg-emerald-50"
              }
            >
              <div className="bg-emerald-950 p-3 text-white">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <span className={labelStyle}>Date</span>
                <p className="font-black text-emerald-950 uppercase italic">
                  {formatDate(events.date)}
                </p>
              </div>
            </div>

            <div
              className={
                boxStyle + " p-6 flex gap-4 items-center bg-emerald-50"
              }
            >
              <div className="bg-emerald-950 p-3 text-white">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className={labelStyle}>Deployment</span>
                <p className="font-black text-emerald-950 uppercase italic">
                  {events.time}
                </p>
              </div>
            </div>

            <div
              className={boxStyle + " p-6 flex gap-4 items-center bg-amber-50"}
            >
              <div className="bg-amber-500 p-3 text-emerald-950 border-2 border-emerald-950">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <span className={labelStyle}>Access Fee</span>
                <p className="font-black text-emerald-950 uppercase italic">
                  {formatFee(events.joiningFee)}
                </p>
              </div>
            </div>

            <div
              className={boxStyle + " p-6 flex gap-4 items-center bg-amber-50"}
            >
              <div className="bg-amber-500 p-3 text-emerald-950 border-2 border-emerald-950">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className={labelStyle}>Manifest</span>
                <p className="font-black text-emerald-950 uppercase italic">
                  {events.currentParticipants} / {events.maxParticipants}{" "}
                  <span className="text-[10px] opacity-50">PAX</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Host & Management (4 Columns) */}
        <div className="lg:col-span-4 space-y-8">
          {/* Host Card */}
          <div className={boxStyle + " sticky top-8 overflow-hidden"}>
            <div className="bg-emerald-950 p-4 text-white font-black uppercase tracking-widest text-[10px]">
              Originator Info
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-20 h-20 border-4 border-amber-400 shrink-0">
                  {events.host.profileImage ? (
                    <Image
                      src={events.host.profileImage}
                      alt={events.host.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-emerald-100 flex items-center justify-center text-emerald-950 font-black text-2xl uppercase italic">
                      {events.host.fullName[0]}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-emerald-950 italic">
                    {events.host.fullName}
                  </h3>
                  <div className="flex items-center text-amber-500 font-black">
                    <Star size={16} fill="currentColor" />
                    <span className="ml-2 text-emerald-900">
                      {events.host.rating || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs font-bold text-emerald-800 italic border-l-4 border-amber-400 pl-4 py-2 bg-emerald-50">
                &quot;
                {events.host.bio || "Host has not provided a mission bio."}
                &quot;
              </p>
            </div>
          </div>

          {/* Quick Management */}
          <div className={boxStyle + " p-6 bg-emerald-950 text-white"}>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-4 text-amber-400">
              Current Participants
            </h3>
            <button className="w-full py-4 border-2 border-amber-400 bg-transparent text-amber-400 hover:bg-amber-400 hover:text-emerald-950 transition-colors font-black uppercase italic flex items-center justify-center gap-3">
              <Users size={20} />
              View Roster ({events.participants.length})
            </button>

            <div className="mt-6 pt-4 border-t border-emerald-800 text-[10px] font-bold text-emerald-500 flex justify-between uppercase">
              <span>
                EST: {new Date(events.createdAt).toLocaleDateString()}
              </span>
              <span>
                MOD: {new Date(events.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-12">
        <div className="flex items-center gap-4 mb-10">
          <h2 className="text-4xl font-black uppercase italic text-emerald-950">
            Reviews
          </h2>
          <div className="h-2 bg-amber-400 grow"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {eventReviews.reviews.length > 0 ? (
            eventReviews.reviews.map((review: any, index: number) => (
              <ReviewCard key={index} review={review} />
            ))
          ) : (
            <div className="col-span-full py-12 border-4 border-dashed border-emerald-950 text-center font-black uppercase italic text-emerald-900/40">
              No participant feedback reported yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
