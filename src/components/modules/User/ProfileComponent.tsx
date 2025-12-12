


/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  CalendarCheck,
  Edit,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Helper to format rating display
const renderRating = (rating: number, totalRatings: number) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-yellow-500 text-yellow-500"
              : "fill-gray-300 text-gray-300"
          }
        />
      ))}
      <span className="ml-1 text-sm font-semibold text-gray-800">
        {rating.toFixed(1)}{" "}
        <span className="text-gray-500 font-normal">
          ({totalRatings || 0} reviews)
        </span>
      </span>
    </div>
  );
};

export function ProfileComponent({ data }: { data: any }) {
  const user = data.user;
  const hostedEventsCount = data.hostedEvents?.length || 0;
  const joinedEventsCount = data.joinedEvents?.length || 0;
  const reviewsCount = data.reviews?.length || 0;
  const isHost = user.role === "host";

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* ===== Profile Header ===== */}
      <Card className="bg-white shadow-xl border-t-4 border-blue-600">
        <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <Avatar className="w-28 h-28 border-4 border-white shadow-md">
              <AvatarImage src={user.profileImage || ""} alt={user.fullName} />
              <AvatarFallback className="text-4xl bg-blue-600 text-white font-bold">
                {user.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            {/* User Info & Rating */}
            <div className="flex-1 space-y-1 pt-1">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {user.fullName}
              </h2>

              {/* Role Badge */}
              <Badge
                className={`px-2 py-0.5 text-xs font-semibold ${
                  isHost
                    ? "bg-purple-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {isHost ? (
                  <>
                    <UserPlus size={14} className="mr-1" /> Verified Host
                  </>
                ) : (
                  "Regular User"
                )}
              </Badge>

              {/* Location */}
              {user.location && (
                <div className="flex items-center text-md text-gray-600 gap-2 pt-2">
                  <MapPin size={18} className="text-blue-500" />
                  <span>
                    {user?.location?.area}, {user?.location?.city}
                  </span>
                </div>
              )}

              {/* Rating Display */}
              <div className="pt-1">
                {renderRating(user.rating || 0, user.totalRatings)}
              </div>
            </div>
          </div>

          {/* Actions (Since this component is assumed to be for the owner's view) */}
          <Link href="/profile/update" passHref>
            <Button className="bg-blue-600 hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer">
              <Edit className="w-4 h-4" />
              Update Profile
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* ===== Contact Info & Stats (Grid) ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information (Displayed as this is the owner's view) */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <Phone className="w-5 h-5 text-blue-500" />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-gray-500" />
              <span className="font-medium">{user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={18} className="text-gray-500" />
              <span className="font-medium">
                {user.phone || "Not provided"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Activity Statistics */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <CalendarCheck className="w-5 h-5 text-green-500" />
              Activity Statistics
            </CardTitle>
          </CardHeader>

          <CardContent
            className={`grid gap-4 ${isHost ? "grid-cols-3" : "grid-cols-2"}`}
          >
            {isHost && (
              <div className="p-2 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">
                  {hostedEventsCount}
                </p>
                <p className="text-xs text-gray-600">Hosted Events</p>
              </div>
            )}

            <div className="p-2 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-700">
                {joinedEventsCount}
              </p>
              <p className="text-xs text-gray-600">Joined Events</p>
            </div>

            <div className="p-2 bg-purple-50 rounded-lg">
              <p className="text-2xl font-bold text-purple-700">
                {reviewsCount}
              </p>
              <p className="text-xs text-gray-600">Reviews Written</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ===== Bio ===== */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            About {user.fullName.split(" ")[0]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed text-base">
            {user.bio ||
              "No biography provided. Click 'Update Profile' to add one!"}
          </p>
        </CardContent>
      </Card>

      {/* ===== Interests ===== */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800">
            Interests & Hobbies
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          {user.interests?.length > 0 ? (
            user.interests.map((interest: string, i: number) => (
              <Badge
                key={i}
                className="px-4 py-1.5 bg-indigo-500 text-white hover:bg-indigo-600 transition shadow-sm font-medium"
              >
                {interest}
              </Badge>
            ))
          ) : (
            <p className="text-gray-600 text-sm italic">
              User has not specified any interests.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Hosted Events List (Visible only if user is a Host) */}
      {/* {isHost && (
        <div className="pt-4">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Your Hosted Events
          </h3>
          <p className="text-gray-600 border p-4 rounded-lg bg-gray-50">
            [Placeholder: Render a list or carousel of the user&apos;s recent
            hosted events here.]
          </p>
        </div>
      )} */}
    </div>
  );
}
