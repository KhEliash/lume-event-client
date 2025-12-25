/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  CalendarCheck,
  Star,
  TrendingUp,
  MapPin,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import Link from "next/link";

const cardBase =
  "bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]";
const labelStyle =
  "text-[10px] font-black uppercase tracking-[0.2em] text-emerald-900/40 italic mb-1 block";

export default function HostAnalyticsClient({
  host,
  events,
}: {
  host: any;
  events: any[];
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalParticipants = events.reduce(
    (acc: number, curr: any) => acc + (curr.currentParticipants || 0),
    0
  );
  const completedEvents = events.filter(
    (e: any) => e.status === "completed"
  ).length;
  const activeEvents = events.filter((e: any) => e.status === "open").length;
  console.log(activeEvents);
  const chartData = events.slice(0, 6).map((e: any) => ({
    name: e.name.length > 12 ? e.name.substring(0, 10) + ".." : e.name,
    pax: e.currentParticipants || 0,
  }));

  return (
    <div className="p-4 md:p-10 py-6 min-h-screen space-y-10">
      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-4 border-emerald-950 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-emerald-950 text-[10px] font-black px-2 py-0.5 uppercase italic border border-emerald-950">
              Verified Host
            </span>
            <span className="text-emerald-900/30 text-[10px] font-black uppercase tracking-widest">
              // MISSION_CONTROL
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            {host.fullName || "Host"}{" "}
            <span className="text-emerald-800/20 underline decoration-amber-400">
              Intel
            </span>
          </h1>
          <p className="text-sm font-bold text-emerald-900/60 uppercase tracking-tight flex items-center gap-2">
            <MapPin size={14} className="text-amber-500" />{" "}
            {host.location?.city || "Sector 7"} // Registry:{" "}
            {new Date(host.createdAt).getFullYear()}
          </p>
        </div>

        <div className="bg-emerald-950 text-white p-6 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] flex gap-8 border-2 border-emerald-950">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase text-white/50 mb-1">
              Reputation
            </p>
            <div className="flex items-center gap-1 text-amber-400">
              <span className="text-3xl font-black italic">
                {host.rating || 0}
              </span>
              <Star size={20} fill="currentColor" />
            </div>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-[10px] font-black uppercase text-white/50 mb-1">
              Ratings
            </p>
            <span className="text-3xl font-black italic text-white">
              {host.totalRatings || 0}
            </span>
          </div>
        </div>
      </div>

      {/* METRIC GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={cardBase}>
          <label className={labelStyle}>Global Outreach</label>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black italic text-emerald-950 leading-none">
              {totalParticipants}
            </h3>
            <Users size={24} className="text-amber-500" />
          </div>
        </div>

        <div className={cardBase}>
          <label className={labelStyle}>Missions</label>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black italic text-emerald-950 leading-none">
              {events.length}
            </h3>
            <CalendarCheck size={24} className="text-amber-500" />
          </div>
        </div>

        <div className={cardBase}>
          <label className={labelStyle}>Success Rate</label>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black italic text-emerald-950 leading-none">
              {events.length > 0
                ? ((completedEvents / events.length) * 100).toFixed(0)
                : 0}
              %
            </h3>
            <TrendingUp size={24} className="text-emerald-600" />
          </div>
        </div>

        <div className={cardBase}>
          <label className={labelStyle}>System Status</label>
          <div className="flex justify-between items-end">
            <h3 className="text-4xl font-black italic text-emerald-950 leading-none">
              {host.isActive ? "ACTIVE" : "OFFLINE"}
            </h3>
            <ShieldCheck
              size={24}
              className={host.isActive ? "text-emerald-500" : "text-red-500"}
            />
          </div>
        </div>
      </div>

      {/* CHARTS & FEED SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* BAR CHART */}
        <div className={`${cardBase} lg:col-span-2 space-y-6`}>
          <div className="flex justify-between items-center border-b-2 border-emerald-950 pb-4">
            <h3 className="text-lg font-black uppercase italic text-emerald-950">
              Engagement Density
            </h3>
            <span className="text-[10px] font-black uppercase text-emerald-900/40 italic">
              Active Tracking
            </span>
          </div>

          <div className="h-[300px] w-full bg-emerald-50/30 p-4 border border-dashed border-emerald-950/20">
            {isMounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    fontSize={10}
                    fontWeight="900"
                    axisLine={{ strokeWidth: 2, stroke: "#064e3b" }}
                    tickLine={false}
                  />
                  <YAxis
                    fontSize={10}
                    fontWeight="900"
                    axisLine={{ strokeWidth: 2, stroke: "#064e3b" }}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(251, 191, 36, 0.2)" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "4px solid #064e3b",
                      borderRadius: "0",
                      fontWeight: "900",
                      textTransform: "uppercase",
                      fontSize: "10px",
                    }}
                  />
                  <Bar dataKey="pax" radius={0}>
                    {chartData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={index % 2 === 0 ? "#065f46" : "#f59e0b"}
                        stroke="#064e3b"
                        strokeWidth={2}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-emerald-950"></div>
              </div>
            )}
          </div>
        </div>

        {/* RECENT ACTIVITY LIST */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase italic text-emerald-950 tracking-widest border-l-4 border-amber-400 pl-3">
            Live Manifest
          </h3>
          <div className="space-y-4">
            {events.slice(0, 4).map((event: any, i: number) => (
              <div
                key={i}
                className="bg-white border-2 border-emerald-950 p-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0px_0px_rgba(6,78,59,1)] transition-all cursor-pointer group"
              >
                <Link href={`/host/dashboard/event/${event._id}`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[8px] font-black uppercase text-emerald-900/30 italic">
                      {event.status} // {event.type}
                    </span>
                    <ArrowUpRight size={14} className="text-emerald-950" />
                  </div>
                  <h4 className="font-black uppercase italic text-emerald-950 truncate">
                    {event.name}
                  </h4>
                  <div className="flex gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Users size={10} />
                      <span className="text-[10px] font-black">
                        {event.currentParticipants}/{event.maxParticipants}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={10} />
                      <span className="text-[10px] font-black">
                        {event.time}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
            {events.length === 0 && (
              <p className="text-[10px] font-bold text-emerald-900/40 italic uppercase text-center py-10">
                No missions deployed.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* STATUS BAR */}
      <div className="bg-amber-400 border-4 border-emerald-950 p-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Terminal size={14} className="animate-pulse" />
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-950">
            Data Stream: Active // Last Sync: {new Date().toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}
