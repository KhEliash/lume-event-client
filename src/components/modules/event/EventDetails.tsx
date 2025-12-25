/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Star,
  User,
  Zap,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  joinEventAction,
  leaveEventAction,
} from "@/services/host/event-actions";
import { useRouter, usePathname } from "next/navigation";
import { startTransition, useState } from "react";
import { bookingAction } from "@/services/booking/booking-actions";
import { CreateReviewDialog } from "../Host/CreateReviewDialoge";
import Link from "next/link";
import { ReviewCard } from "../Host/ReviewCard";

export const EventDetails = ({ event, userId, booking, reviews }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const [guestCount, setGuestCount] = useState(1);
  const [isActionLoading, setIsActionLoading] = useState(false);
  // console.log(event);
  console.log(isActionLoading);
  // --- Helpers ---
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isJoined = event.participants?.some((p: any) => p._id === userId);
  const isPaid = event.joiningFee > 0;
  // const noBookingFound = booking === "No booking found";

  // --- Auth Guard ---
  const checkAuth = () => {
    if (!userId) {
      toast.error("Please login to interact with this event");
      router.push(`/login?redirect=${pathname}`);
      return false;
    }
    return true;
  };

  // --- Handlers ---
  const handleJoin = async () => {
    if (!checkAuth()) return;
    toast.loading("Securing your spot...", { id: "join" });
    const res = await joinEventAction(event._id);
    toast.dismiss("join");

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const handleLeave = async () => {
    if (!checkAuth()) return;
    const res = await leaveEventAction(event._id);
    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  const handleBooking = () => {
    if (!checkAuth()) return;
    startTransition(async () => {
      setIsActionLoading(true);
      toast.loading("Processing booking...", { id: "booking" });
      const response = await bookingAction(event._id, guestCount);
      toast.dismiss("booking");
      setIsActionLoading(false);

      if (response.success) {
        if (response.result?.paymentUrl) {
          toast.success("Redirecting to secure payment...");
          setTimeout(() => {
            window.location.href = response.result.paymentUrl;
          }, 1500);
        } else {
          toast.success(`Reserved for ${guestCount} guest(s)!`);
          router.refresh();
        }
      } else {
        toast.error(response.message || "Booking failed.");
      }
    });
  };

  return (
    <div className="container mx-auto space-y-10 px-4 md:px-10 py-16 md:py-24">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/events"
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-950 hover:text-amber-500 transition-colors"
        >
          <ChevronLeft size={16} /> Back to Events
        </Link>
        <Badge className="bg-emerald-950 text-amber-400 border-none px-4 py-1 rounded-none font-black uppercase tracking-tighter">
          {event.status}
        </Badge>
      </div>

      {/* Hero Section */}
      <div className="relative group">
        <div className="w-full h-80 md:h-[550px] border-4 border-emerald-950 shadow-[12px_12px_0px_0px_rgba(6,78,59,1)] overflow-hidden bg-emerald-50">
          {event.eventImage ? (
            <Image
              src={event.eventImage}
              alt={event.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-emerald-950/20">
              <Zap size={80} strokeWidth={1} />
              <p className="font-black uppercase tracking-widest mt-4 text-xs">
                No Visual Signal
              </p>
            </div>
          )}
        </div>
        <div className="absolute -bottom-6 left-6 right-6 bg-white border-2 border-emerald-950 p-6 md:p-8">
          <span className="text-xs font-black text-amber-500 uppercase tracking-[0.3em] mb-2 block">
            {event.type}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-emerald-950 uppercase tracking-tighter leading-none">
            {event.name}
          </h1>
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-10">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-12">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-emerald-950">
            {[
              {
                icon: <Clock size={20} />,
                label: "Time",
                val: event.time,
                color: "bg-white",
              },
              {
                icon: <Calendar size={20} />,
                label: "Date",
                val: formattedDate,
                color: "bg-emerald-50",
              },
              {
                icon: <Users size={20} />,
                label: "Capacity",
                val: `${event.currentParticipants}/${event.maxParticipants}`,
                color: "bg-white",
              },
              {
                icon: <DollarSign size={20} />,
                label: "Entry",
                val: isPaid ? `$${event.joiningFee}` : "FREE",
                color: "bg-amber-400",
              },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 border-r-2 last:border-r-0 border-emerald-950 ${stat.color}`}
              >
                <div className="text-emerald-950 mb-3">{stat.icon}</div>
                <p className="text-[10px] font-black uppercase text-emerald-950/40 tracking-widest">
                  {stat.label}
                </p>
                <p className="font-black text-emerald-950 text-sm md:text-base leading-tight">
                  {stat.val}
                </p>
              </div>
            ))}
          </div>

          {/* About Section */}
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-emerald-950 uppercase tracking-tighter border-b-4 border-amber-400 inline-block">
              The Mission.
            </h2>
            <p className="text-xl text-emerald-900/80 leading-relaxed font-medium italic">
              &quot;{event.description}&quot;
            </p>
          </div>

          {/* Host Card */}
          <div className="p-8 border-2 border-emerald-950 flex flex-col md:flex-row justify-between items-center gap-6 bg-white shadow-[8px_8px_0px_0px_rgba(251,191,36,1)]">
            <div className="flex items-center gap-6 text-center md:text-left">
              <div className="relative w-20 h-20 border-2 border-emerald-950 rounded-full overflow-hidden shrink-0">
                {event.host?.profileImage ? (
                  <Image
                    src={event.host.profileImage}
                    fill
                    className="object-cover"
                    alt="Host"
                  />
                ) : (
                  <div className="w-full h-full bg-emerald-100 flex items-center justify-center">
                    <User size={30} />
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-950/40 uppercase tracking-widest">
                  Architect of Event
                </p>
                <p className="text-2xl font-black text-emerald-950 uppercase">
                  {event.host?.fullName}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center border-l-0 md:border-l-2 border-emerald-950 pl-0 md:pl-8">
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                <Star className="fill-amber-500" size={24} />
                <span className="text-2xl font-black">
                  {event.host?.rating}
                </span>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                Host Rating
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Actions */}
        <div className="space-y-8">
          <div className="sticky top-10 space-y-6">
            {/* Main Action Card */}
            <div className="border-4 border-emerald-950 p-3 md:p-8 bg-white shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] space-y-6">
              <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter">
                Your Presence.
              </h3>

              {event.status !== "open" ? (
                <div className="p-4 bg-red-50 border-2 border-red-500 text-red-600 font-black uppercase text-xs tracking-widest">
                  This Transmission is {event.status}.
                </div>
              ) : (
                <div className="space-y-4">
                  {!userId ? (
                    <Button
                      onClick={handleJoin}
                      className="w-full h-16 rounded-none bg-amber-400 hover:bg-emerald-950 hover:text-amber-400 text-emerald-950 font-black uppercase tracking-[0.2em] border-2 border-emerald-950 transition-all"
                    >
                      Login to join
                    </Button>
                  ) : (
                    <>
                      {/* Interaction Logic */}
                      {!isPaid ? (
                        <Button
                          onClick={isJoined ? handleLeave : handleJoin}
                          className={`w-full h-16 rounded-none font-black uppercase tracking-[0.2em] border-2 border-emerald-950 ${
                            isJoined
                              ? "bg-white text-red-500 hover:bg-red-50"
                              : "bg-emerald-950 text-amber-400 hover:bg-emerald-800"
                          }`}
                        >
                          {isJoined
                            ? "Abort Mission (Leave)"
                            : "Claim Free Spot"}
                        </Button>
                      ) : (
                        <div className="space-y-4">
                          {isJoined ? (
                            <Button
                              onClick={handleLeave}
                              variant="destructive"
                              className="w-full h-16 rounded-none font-black uppercase tracking-widest"
                            >
                              Cancel Presence
                            </Button>
                          ) : booking?.status === "COMPLETE" ? (
                            <Button
                              onClick={handleJoin}
                              className="w-full h-16 rounded-none bg-emerald-950 text-amber-400 font-black uppercase tracking-widest border-2 border-emerald-950"
                            >
                              Verify & Join
                            </Button>
                          ) : (
                            <>
                              <div className="flex items-center justify-between border-2 border-emerald-950 p-4">
                                <span className="font-black uppercase text-[10px] tracking-widest">
                                  Guests
                                </span>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() =>
                                      setGuestCount(Math.max(1, guestCount - 1))
                                    }
                                    className="w-8 h-8 border border-emerald-950 flex items-center justify-center font-black"
                                  >
                                    -
                                  </button>
                                  <span className="font-black text-lg">
                                    {guestCount}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setGuestCount(guestCount + 1)
                                    }
                                    className="w-8 h-8 border border-emerald-950 flex items-center justify-center font-black"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <Button
                                onClick={handleBooking}
                                className="w-full h-16 rounded-none bg-emerald-950 text-amber-400 font-black uppercase tracking-widest border-2 border-emerald-950"
                              >
                                Book Entry • ${event.joiningFee * guestCount}
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Location Card */}
            <div className="border-2 border-emerald-950 p-6 bg-emerald-50 space-y-4">
              <div className="flex items-center gap-2 text-emerald-950">
                <MapPin size={20} className="text-amber-500" />
                <h3 className="font-black uppercase text-sm tracking-widest">
                  Ground Zero
                </h3>
              </div>
              <div>
                <p className="font-black text-emerald-950 uppercase">
                  {event.location?.address}
                </p>
                <p className="text-xs font-bold text-emerald-950/60 uppercase tracking-widest">
                  {event.location?.city}
                </p>
              </div>
              <div className="h-32 bg-emerald-950/5 border-2 border-dashed border-emerald-950 flex items-center justify-center text-emerald-950/20 font-black text-[10px] uppercase tracking-[0.3em]">
                Secure Map Preview
              </div>
            </div>

            {/* Review Section */}
            {event.status === "completed" && (
              <div className="border-2 border-emerald-950 p-6 bg-white shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]">
                <div className="flex items-center gap-2 mb-4">
                  <Star size={20} className="text-amber-500" />
                  <h3 className="font-black uppercase text-sm tracking-widest">
                    Debrief (Review)
                  </h3>
                </div>
                <CreateReviewDialog eventId={event._id} userId={userId} />
              </div>
            )}
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
          {reviews.length > 0 ? (
            reviews.map((review: any, index: number) => (
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
};
