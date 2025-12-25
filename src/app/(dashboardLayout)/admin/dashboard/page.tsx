/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { getAllUsers } from "@/services/admin/user-management";
import { getAllEvents } from "@/services/host/event-actions";

const cardStyle =
  "bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none";
const labelStyle =
  "text-[10px] font-black uppercase tracking-widest text-emerald-900/40 italic";

const MetricCard = ({
  title,
  value,
  icon: Icon,
  description,
  trendColor = "bg-amber-400",
}: any) => (
  <div className={cardStyle}>
    <div className="flex justify-between items-start mb-4">
      <div
        className={`p-3 border-2 border-emerald-950 ${trendColor} text-emerald-950 shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]`}
      >
        <Icon size={24} />
      </div>
      <span className="text-[10px] font-black uppercase bg-emerald-950 text-white px-2 py-0.5 italic">
        Live Data
      </span>
    </div>
    <p className={labelStyle}>{title}</p>
    <h2 className="text-4xl font-black text-emerald-950 italic tracking-tighter mb-1">
      {value}
    </h2>
    <p className="text-xs font-bold text-emerald-800/60">{description}</p>
  </div>
);

const processIntelligence = (usersRes: any, eventsRes: any) => {
  const users = usersRes?.users?.data || [];
  const meta = usersRes?.users?.meta || { total: 0 };
  const events = eventsRes?.data || [];

  // User Stats
  const admins = users.filter((u: any) => u.role === "admin").length;
  const hosts = users.filter((u: any) => u.role === "host").length;
  const regularUsers = users.filter((u: any) => u.role === "user").length;

  // Event Stats
  const totalEvents = eventsRes?.meta?.total || 0;
  const openEvents = events.filter((e: any) => e.status === "open").length;
  const totalRevenue = events.reduce(
    (acc: number, curr: any) =>
      acc + curr.joiningFee * (curr.currentParticipants || 0),
    0
  );

  const totalPAX = events.reduce(
    (acc: number, curr: any) => acc + (curr.currentParticipants || 0),
    0
  );

  return {
    meta: {
      totalUsers: meta.total,
      admins,
      hosts,
      regularUsers,
    },
    events: {
      total: totalEvents,
      open: openEvents,
      revenue: totalRevenue,
      pax: totalPAX,
    },
  };
};

const Analytics = async () => {
  const usersResponse = await getAllUsers();
  const eventsResponse = await getAllEvents();

  const metrics = processIntelligence(usersResponse, eventsResponse);

  return (
    <div className="px-4 md:px-10  py-6 min-h-screen space-y-12">
      {/* Header Intel */}
      <div className="border-l-8 border-amber-400 pl-6 py-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-900/40 mb-1">
            <BarChart3 size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Core Intelligence // Analytics
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            System{" "}
            <span className="text-amber-500 underline decoration-emerald-950 underline-offset-8">
              Overview
            </span>
          </h1>
        </div>
        <div className="bg-emerald-950 text-white p-4 font-black uppercase italic text-xs shadow-[8px_8px_0px_0px_rgba(251,191,36,1)]">
          Session Status: Admin Verified
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard
          title="Total Personnel"
          value={metrics.meta.totalUsers}
          icon={Users}
          description={`${metrics.meta.regularUsers} standard active accounts.`}
        />
        <MetricCard
          title="Operational Events"
          value={metrics.events.total}
          icon={Calendar}
          trendColor="bg-emerald-400"
          description={`${metrics.events.open} events currently accepting PAX.`}
        />
        <MetricCard
          title="Global Participants"
          value={metrics.events.pax}
          icon={Activity}
          description="Total engagement across all mission types."
        />
        <MetricCard
          title="System Revenue"
          value={`$${metrics.events.revenue.toLocaleString()}`}
          icon={DollarSign}
          trendColor="bg-emerald-400"
          description="Gross credits from mission joining fees."
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Intel: Role Distribution */}
        <div className="lg:col-span-7 bg-white border-4 border-emerald-950 p-8 shadow-[10px_10px_0px_0px_rgba(251,191,36,1)]">
          <h3 className="text-2xl font-black uppercase italic text-emerald-950 mb-8 border-b-4 border-emerald-950 inline-block">
            Personnel Distribution
          </h3>

          <div className="space-y-8">
            <div className="group">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black uppercase flex items-center gap-2">
                  <UserCheck size={14} className="text-amber-500" /> Standard
                  Users
                </span>
                <span className="text-xs font-black">
                  {metrics.meta.regularUsers}
                </span>
              </div>
              <div className="h-6 border-2 border-emerald-950 bg-emerald-50 relative overflow-hidden">
                <div
                  className="h-full bg-emerald-950 transition-all duration-1000"
                  style={{
                    width: `${
                      (metrics.meta.regularUsers / metrics.meta.totalUsers) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black uppercase flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-500" />{" "}
                  Certified Hosts
                </span>
                <span className="text-xs font-black">{metrics.meta.hosts}</span>
              </div>
              <div className="h-6 border-2 border-emerald-950 bg-emerald-50 relative overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-1000"
                  style={{
                    width: `${
                      (metrics.meta.hosts / metrics.meta.totalUsers) * 100
                    }%`,
                  }}
                />
              </div>
            </div>

            <div className="group">
              <div className="flex justify-between mb-2">
                <span className="text-xs font-black uppercase flex items-center gap-2">
                  <ShieldCheck size={14} className="text-red-500" /> Command
                  Admins
                </span>
                <span className="text-xs font-black">
                  {metrics.meta.admins}
                </span>
              </div>
              <div className="h-6 border-2 border-emerald-950 bg-emerald-50 relative overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-1000"
                  style={{
                    width: `${
                      (metrics.meta.admins / metrics.meta.totalUsers) * 100
                    }%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Intel: Quick Status Summary */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="bg-emerald-950 text-white p-8 border-4 border-emerald-950 shadow-[10px_10px_0px_0px_rgba(16,185,129,1)]">
            <h3 className="text-xl font-black uppercase italic mb-6 text-amber-400">
              System Integrity
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Active Deployments
                </span>
                <span className="font-black italic text-lg">
                  {metrics.events.open}
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Total User Load
                </span>
                <span className="font-black italic text-lg">
                  {metrics.meta.totalUsers}
                </span>
              </li>
              <li className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                  Revenue Density
                </span>
                <span className="font-black italic text-lg">
                  $
                  {(
                    metrics.events.revenue / (metrics.events.total || 1)
                  ).toFixed(2)}{" "}
                  / Avg
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-amber-400 p-8 border-4 border-emerald-950 shadow-[10px_10px_0px_0px_rgba(6,78,59,1)]">
            <h3 className="text-xl font-black uppercase italic text-emerald-950">
              Mission Manifest
            </h3>
            <p className="text-[10px] font-black uppercase text-emerald-950/60 mb-6">
              Engagement Capacity
            </p>
            <div className="flex items-center justify-center py-4 border-2 border-emerald-950 bg-white">
              <div className="text-center">
                <p className="text-4xl font-black italic text-emerald-950 tracking-tighter">
                  {(
                    (metrics.events.open / (metrics.events.total || 1)) *
                    100
                  ).toFixed(0)}
                  %
                </p>
                <p className="text-[8px] font-black uppercase text-emerald-900/40 italic">
                  Activity Rate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Server Intel Feed */}
      <div className="bg-white border-4 border-emerald-950 p-4">
        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-emerald-950">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 animate-pulse" /> Server
            Status: Optimal
          </span>
          <span className="opacity-20">|</span>
          <span>Last Sync: {new Date().toLocaleTimeString()}</span>
          <span className="opacity-20">|</span>
          <span className="text-amber-600">
            Total Database Entries:{" "}
            {metrics.meta.totalUsers + metrics.events.total}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
