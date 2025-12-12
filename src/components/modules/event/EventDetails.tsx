/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  MapPin,
  Star,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  joinEventAction,
  leaveEventAction,
} from "@/services/host/event-actions";
import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { bookingAction } from "@/services/booking/booking-actions";

export const EventDetails = ({ event, userId }: any) => {
    console.log(event);
  // Format date
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // --- Determine if user already joined ---
  const isJoined = event.participants?.some((p: any) => p._id === userId);

  // --- Buttons text ---
  const isPaid = event.joiningFee > 0;
  const [guestCount, setGuestCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  //   const [bookingState, setBookingState] = useState()

  const isDisabledStatus =
    event.status === "cancelled" || event.status === "closed";

  const router = useRouter();
  // join
  const handleJoin = async () => {
    toast.loading("Joining...", { id: "join" });

    const res = await joinEventAction(event._id);

    toast.dismiss("join");

    if (res.success) {
      toast.success(res.message);
      // optionally reload UI
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  // leave
  const handleLeave = async () => {
    const res = await leaveEventAction(event._id);

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  // booking
  const handleBooking = () => {
    startTransition(async () => {
      setIsLoading(true);
      toast.loading("Booking your spot...", { id: "booking" });

      const response = await bookingAction(event._id, guestCount);

      toast.dismiss("booking");
      setIsLoading(false);

      if (response.success) {
        if (response.result?.paymentUrl) {
          toast.success(
            `Spot reserved for ${guestCount} guest(s)! Redirecting to payment...`,
            { duration: 4000 }
          );
          setTimeout(() => {
            window.location.href = response.result.paymentUrl;
          }, 2000);
        } else {
          toast.success(`Booking successful for ${guestCount} guest(s)!`);
          router.refresh();
        }
      } else {
        toast.error(response.message || "Booking failed.");
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-4 md:p-10  min-h-screen">
      {/* Hero Image */}
      <div className="relative">
        <div className="w-full h-80 md:h-[500px] rounded-3xl overflow-hidden bg-gray-200 shadow-xl">
          {event.eventImage ? (
            <Image
              src={event.eventImage}
              alt={event.name}
              fill
              className="object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-gray-500">
              <User className="w-16 h-16 mb-3 opacity-40" />
              <p>No Image Available</p>
            </div>
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-black/80 to-transparent rounded-b-3xl">
          <h1 className="text-4xl font-bold text-white">{event.name}</h1>
          <Badge className="mt-2 capitalize">{event.type}</Badge>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content */}
        <div className="lg:col-span-2 space-y-10">
          {/* Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Time */}
            <Card className="shadow-sm border-t-4 border-indigo-500">
              <CardContent className="p-4">
                <Clock className="text-indigo-600" />
                <p className="text-sm mt-2 text-gray-500">Time</p>
                <p className="font-semibold">{event.time}</p>
              </CardContent>
            </Card>

            {/* Date */}
            <Card className="shadow-sm border-t-4 border-blue-500">
              <CardContent className="p-4">
                <Calendar className="text-blue-600" />
                <p className="text-sm mt-2 text-gray-500">Date</p>
                <p className="font-semibold">{formattedDate}</p>
              </CardContent>
            </Card>

            {/* Participants */}
            <Card className="shadow-sm border-t-4 border-green-500">
              <CardContent className="p-4">
                <Users className="text-green-600" />
                <p className="text-sm mt-2 text-gray-500">Participants</p>
                <p className="font-semibold">
                  {event.currentParticipants} / {event.maxParticipants}
                </p>
              </CardContent>
            </Card>

            {/* Fee */}
            <Card className="shadow-sm border-t-4 border-yellow-500">
              <CardContent className="p-4">
                <DollarSign className="text-yellow-600" />
                <p className="text-sm mt-2 text-gray-500">Fee</p>
                <p className="font-bold">
                  {isPaid ? `$${event.joiningFee}` : "FREE"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">About the Event</h2>
            <p className="text-gray-700 text-lg">{event.description}</p>

            {/* Host Card */}
            <Card className="p-6 flex justify-between items-center border-l-4 border-red-400">
              <div className="flex items-center gap-4">
                {event.host?.profileImage ? (
                  <Image
                    src={event.host.profileImage}
                    width={60}
                    height={60}
                    className="rounded-full border object-cover"
                    alt="Host"
                  />
                ) : (
                  <div className="w-[60px] h-[60px] rounded-full border flex items-center justify-center bg-gray-200">
                    <User className="w-8 h-8 text-gray-500" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-500">Hosted By</p>
                  <p className="font-bold text-lg">{event.host?.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="fill-yellow-500" />
                <span className="font-semibold">{event.host?.rating}</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8 sticky top-10">
          {/* ACTION BUTTON */}
          <Card className="p-6 border shadow space-y-5">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <User className="text-teal-600" />
              Your Action
            </h3>

            {/* Show warning if disabled */}
            {isDisabledStatus && (
              <p className="text-red-600 font-semibold text-sm">
                This event is {event.status}. You cannot join or book now.
              </p>
            )}

            {isPaid && !isJoined && !isDisabledStatus && (
              <div className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <p className="font-semibold text-sm">Guests:</p>

                <div className="flex items-center gap-3">
                  <button
                    className="px-3 py-1 bg-white border rounded disabled:opacity-50"
                    onClick={() =>
                      setGuestCount((prev) => Math.max(1, prev - 1))
                    }
                    disabled={guestCount <= 1 || isDisabledStatus}
                  >
                    −
                  </button>

                  <span className="text-lg font-bold">{guestCount}</span>

                  <button
                    className="px-3 py-1 bg-white border rounded"
                    onClick={() => setGuestCount((prev) => prev + 1)}
                    disabled={isDisabledStatus}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {!isPaid && !isJoined && (
              <Button
                onClick={handleJoin}
                className="w-full py-5 bg-teal-600 hover:bg-teal-700 text-white cursor-pointer"
                disabled={isDisabledStatus}
              >
                Join Event
              </Button>
            )}

            {isPaid && !isJoined && (
              <Button
                onClick={handleBooking}
                className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                disabled={isDisabledStatus}
              >
                Book for {guestCount} {guestCount > 1 ? "guests" : "guest"}
              </Button>
            )}

            {isJoined && (
              <Button
                onClick={handleLeave}
                variant="destructive"
                className="w-full py-5 cursor-pointer"
                disabled={isDisabledStatus}
              >
                Leave Event
              </Button>
            )}
          </Card>

          {/* Location */}
          <Card className="p-6 border shadow">
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <MapPin className="text-red-600" />
              Location
            </h3>
            <p className="text-lg font-semibold">{event.location.address}</p>
            <p className="text-sm text-gray-500">{event.location.city}</p>
            <div className="h-40 bg-gray-100 mt-4 rounded-lg flex items-center justify-center text-gray-400">
              Map Preview
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
