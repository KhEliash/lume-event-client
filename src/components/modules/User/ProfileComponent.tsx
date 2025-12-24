/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Star,
  Edit,
  ShieldCheck,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const renderRating = (rating: number, totalRatings: number) => {
  return (
    <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-3 py-1 w-fit shadow-[2px_2px_0px_0px_rgba(251,191,36,1)]">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          className={
            star <= rating
              ? "fill-amber-500 text-amber-500"
              : "fill-emerald-950/10 text-emerald-950/10"
          }
        />
      ))}
      <span className="ml-2 text-xs font-black text-emerald-950 uppercase tracking-tighter">
        {rating.toFixed(1)}{" "}
        <span className="text-emerald-950/40">
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
    <div className="mx-auto space-y-8">
      {/* ===== Profile Header ===== */}
      <div className="bg-white border-4 border-emerald-950 p-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Avatar with Brutalist Border */}
          <div className="relative">
            <Avatar className="w-32 h-32 rounded-none border-4 border-emerald-950 shadow-[6px_6px_0px_0px_rgba(6,78,59,1)]">
              <AvatarImage
                src={user.profileImage || ""}
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <AvatarFallback className="rounded-none text-4xl bg-emerald-950 text-amber-400 font-black">
                {user.fullName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isHost && (
              <div className="absolute -bottom-2 -right-2 bg-amber-400 border-2 border-emerald-950 p-1">
                <ShieldCheck size={20} className="text-emerald-950" />
              </div>
            )}
          </div>

          <div className="text-center md:text-left space-y-2">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <h2 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter leading-none">
                {user.fullName}
              </h2>
              <Badge
                className={`rounded-none border-2 border-emerald-950 uppercase tracking-widest text-[10px] font-black ${
                  isHost
                    ? "bg-amber-400 text-emerald-950"
                    : "bg-emerald-50 text-emerald-950"
                }`}
              >
                {isHost ? "Verified Host" : "Member"}
              </Badge>
            </div>

            {user.location && (
              <div className="flex items-center justify-center md:justify-start text-xs font-bold text-emerald-950/60 uppercase tracking-widest gap-2">
                <MapPin size={14} className="text-amber-500" />
                <span>
                  {user?.location?.area}, {user?.location?.city}
                </span>
              </div>
            )}

            <div className="pt-2">
              {renderRating(user.rating || 0, user.totalRatings)}
            </div>
          </div>
        </div>

        <Link href="/profile/update">
          <Button className="rounded-none bg-emerald-950 text-amber-400 hover:bg-amber-400 hover:text-emerald-950 border-2 border-emerald-950 font-black uppercase tracking-widest text-xs h-12 px-8 transition-all shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] active:shadow-none translate-y-0 active:translate-y-1">
            <Edit className="w-4 h-4 mr-2" /> Update Profile
          </Button>
        </Link>
      </div>

      {/* ===== Grid: Details & Stats ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 border-2 border-emerald-950 p-6 bg-white space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-950 border-b-2 border-dotted border-emerald-950 pb-2">
            Contact Registry
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 border border-emerald-950">
                <Mail size={16} className="text-emerald-950" />
              </div>
              <span className="text-xs font-bold text-emerald-900 truncate">
                {user.email}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 border border-emerald-950">
                <Phone size={16} className="text-emerald-950" />
              </div>
              <span className="text-xs font-bold text-emerald-900">
                {user.phone || "UNLISTED"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="md:col-span-2 border-2 border-emerald-950 p-6 bg-emerald-950 text-white">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-amber-400 border-b-2 border-dotted border-amber-400/30 pb-2">
            Mission Statistics
          </h3>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 border border-amber-400/20 bg-emerald-900/50">
              <p className="text-3xl font-black text-amber-400">
                {hostedEventsCount}
              </p>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/50">
                Hosted
              </p>
            </div>
            <div className="text-center p-4 border border-amber-400/20 bg-emerald-900/50">
              <p className="text-3xl font-black text-amber-400">
                {joinedEventsCount}
              </p>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/50">
                Joined
              </p>
            </div>
            <div className="text-center p-4 border border-amber-400/20 bg-emerald-900/50">
              <p className="text-3xl font-black text-amber-400">
                {reviewsCount}
              </p>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/50">
                Reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Bio & Interests ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border-2 border-emerald-950 p-6 bg-white">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-950 mb-4 flex items-center gap-2">
            <Zap size={16} className="text-amber-500" /> Bio / Transmission
          </h3>
          <p className="text-sm text-emerald-900/80 leading-relaxed font-medium italic border-l-4 border-amber-400 pl-4">
            {user.bio ||
              "No data provided. Update identity file to include biography."}
          </p>
        </div>

        <div className="border-2 border-emerald-950 p-6 bg-white">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-950 mb-4">
            Affinities & Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {user.interests?.length > 0 ? (
              user.interests.map((interest: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-emerald-50 border border-emerald-950 text-[10px] font-black uppercase tracking-widest text-emerald-950"
                >
                  {interest}
                </span>
              ))
            ) : (
              <p className="text-xs italic text-emerald-950/40">
                No affinities logged.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
