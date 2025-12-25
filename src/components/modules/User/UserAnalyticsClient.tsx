/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Ticket,
  CreditCard,
  Star,
  MapPin,
  Zap,
  Heart,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";
import Link from "next/link";

const cardBase =
  "bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]";
const labelStyle =
  "text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40 italic mb-1 block";

export default function UserAnalyticsClient({ user, joinedEvents }: any) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalSpent = joinedEvents.reduce(
    (acc: number, curr: any) => acc + (curr.joiningFee || 0),
    0
  );
  const eventTypes = joinedEvents.reduce((acc: any, curr: any) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, {});

  const typeData = Object.keys(eventTypes).map((key) => ({
    name: key.toUpperCase(),
    value: eventTypes[key],
  }));

  const COLORS = ["#065f46", "#f59e0b", "#10b981", "#fbbf24"];

  return (
    <div className="p-4 md:p-10 py-6 min-h-screen space-y-10">
      {/* HEADER: USER PROFILE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-emerald-950 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-950 text-white text-[10px] font-black px-2 py-0.5 uppercase italic border border-emerald-950">
              Active Member
            </span>
            <span className="text-emerald-900/30 text-[10px] font-black uppercase tracking-widest">
              // USER_INTEL
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            {user.fullName} <span className="text-amber-500">Activity</span>
          </h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <p className="text-sm font-bold text-emerald-900/60 uppercase tracking-tight flex items-center gap-2">
              <MapPin size={14} className="text-amber-500" />{" "}
              {user.location?.city || "Unknown Sector"}
            </p>
            <p className="text-sm font-bold text-emerald-900/60 uppercase tracking-tight flex items-center gap-2">
              <Star size={14} className="text-amber-500" /> Member Rating:{" "}
              {user.rating}/5
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          {user.interests?.map((interest: string) => (
            <span
              key={interest}
              className="px-3 py-1 border-2 border-emerald-950 bg-amber-100 text-[10px] font-black uppercase italic"
            >
              #{interest}
            </span>
          ))}
        </div>
      </div>

      {/* TOP METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={cardBase}>
          <label className={labelStyle}>Events Joined</label>
          <div className="flex justify-between items-end">
            <h3 className="text-5xl font-black italic text-emerald-950 leading-none">
              {joinedEvents.length}
            </h3>
            <Ticket size={32} className="text-amber-500" />
          </div>
        </div>

        <div
          className={`${cardBase} bg-emerald-950 text-white shadow-[8px_8px_0px_0px_rgba(251,191,36,1)]`}
        >
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 italic mb-1 block">
            Total Investment
          </label>
          <div className="flex justify-between items-end">
            <h3 className="text-5xl font-black italic text-amber-400 leading-none">
              ${totalSpent.toFixed(2)}
            </h3>
            <CreditCard size={32} className="text-white/20" />
          </div>
        </div>

        <div className={cardBase}>
          <label className={labelStyle}>Experience Points</label>
          <div className="flex justify-between items-end">
            <h3 className="text-5xl font-black italic text-emerald-950 leading-none">
              {joinedEvents.length * 10}
            </h3>
            <Zap size={32} className="text-emerald-500" />
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* PIE CHART: Interest Distribution */}
        <div className={cardBase}>
          <h3 className="text-xl font-black uppercase italic text-emerald-950 mb-6 flex items-center gap-2">
            <Heart size={20} className="text-red-500" /> Event Category Split
          </h3>
          <div className="h-[300px] w-full">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="#064e3b"
                    strokeWidth={2}
                  >
                    {typeData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      border: "4px solid #064e3b",
                      borderRadius: "0",
                      fontWeight: "bold",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="animate-pulse bg-emerald-50 h-full w-full" />
            )}
          </div>
          <div className="flex justify-center gap-4 mt-4">
            {typeData.map((t, i) => (
              <div key={i} className="flex items-center gap-1">
                <div
                  className="w-3 h-3 border border-emerald-950"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-[8px] font-black uppercase">
                  {t.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RECENT ACTIVITY LOG */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase italic text-emerald-950 tracking-widest border-l-4 border-amber-400 pl-3 flex items-center justify-between">
            Recent Deployments
            <Calendar size={16} />
          </h3>
          <div className="space-y-4">
            {joinedEvents.map((event: any, i: number) => (
              <div
                key={i}
                className="bg-white border-2 border-emerald-950 p-4 hover:bg-amber-50 transition-colors group relative overflow-hidden"
              >
                <Link href={`/event/${event._id}`}>
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="text-[8px] font-black uppercase text-emerald-900/40">
                        {event.date.split("T")[0]} // {event.type}
                      </span>
                      <h4 className="font-black uppercase italic text-emerald-950 text-lg leading-tight">
                        {event.name}
                      </h4>
                    </div>
                    <ArrowRight
                      size={20}
                      className="-rotate-45 group-hover:rotate-0 transition-transform text-emerald-950"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between relative z-10">
                    <span className="text-[10px] font-bold uppercase text-emerald-900/60 flex items-center gap-1">
                      <MapPin size={10} /> {event.location.address}
                    </span>
                    <span className="bg-emerald-950 text-white px-2 py-0.5 text-[10px] font-black italic">
                      Paid: ${event.joiningFee}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM STATUS FOOTER */}
      <div className="bg-emerald-950 p-4 border-2 border-emerald-950 text-center">
        <p className="text-[9px] font-black uppercase tracking-[0.4em] text-white/40 italic">
          Personal Analytics Stream // Status: Synchronized //{" "}
          {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
