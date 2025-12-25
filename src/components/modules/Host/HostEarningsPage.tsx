/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  Wallet,
  Table as TableIcon,
  BarChart3,
  TrendingDown,
} from "lucide-react";

export default function HostEarningsClient({
  eventList,
}: {
  eventList: any[];
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const eventsWithRevenue = eventList.map((event: any) => ({
    name:
      event.name.length > 15 ? event.name.substring(0, 12) + "..." : event.name,
    revenue: (event.joiningFee || 0) * (event.currentParticipants || 0),
    fee: event.joiningFee || 0,
    pax: event.currentParticipants || 0,
    status: event.status,
  }));

  const totalEarnings = eventsWithRevenue.reduce(
    (acc, curr) => acc + curr.revenue,
    0
  );
  const paidEvents = eventsWithRevenue.filter((e) => e.fee > 0);
  const averageYield = totalEarnings / (eventList.length || 1);

  const chartData = eventsWithRevenue.filter((e) => e.revenue > 0);

  // --- STYLING TOKENS ---
  const brutalistCard =
    "bg-white border-4 border-emerald-950 p-6 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none";
  const labelStyle =
    "text-[10px] font-black uppercase tracking-widest text-emerald-900/40 mb-2 block italic";

  return (
    <div className="p-4 md:p-10 py-6 min-h-screen space-y-12">
      {/* HEADER SECTION */}
      <div className="border-l-8 border-amber-400 pl-6 py-2 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-900/40 mb-1">
            <Wallet size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              Financial // Host // Treasury
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            Revenue{" "}
            <span className="text-amber-500 underline decoration-emerald-950 underline-offset-8">
              Vault
            </span>
          </h1>
        </div>
        <div className="bg-emerald-950 text-white p-4 font-black uppercase italic text-xs shadow-[6px_6px_0px_0px_rgba(251,191,36,1)]">
          Fiscal Year 2025
        </div>
      </div>

      {/* PRIMARY METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          className={`${brutalistCard} bg-emerald-950 text-white border-emerald-950 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] hover:shadow-none`}
        >
          <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block italic">
            Total Gross Credits
          </label>
          <div className="flex justify-between items-end">
            <h2 className="text-5xl font-black italic tracking-tighter text-amber-400">
              $
              {totalEarnings.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}
            </h2>
            <DollarSign size={32} className="text-white/20" />
          </div>
        </div>

        <div className={brutalistCard}>
          <label className={labelStyle}>Yield Ratio</label>
          <div className="flex justify-between items-end">
            <h2 className="text-5xl font-black italic tracking-tighter text-emerald-950">
              ${averageYield.toFixed(2)}
            </h2>
            <TrendingUp size={32} className="text-emerald-500" />
          </div>
          <p className="text-[10px] font-bold text-emerald-950/30 mt-2 uppercase">
            Average per mission
          </p>
        </div>

        <div className={brutalistCard}>
          <label className={labelStyle}>Revenue Streams</label>
          <div className="flex justify-between items-end">
            <h2 className="text-5xl font-black italic tracking-tighter text-emerald-950">
              {paidEvents.length}
            </h2>
            {paidEvents.length > 0 ? (
              <TrendingUp size={32} className="text-emerald-500" />
            ) : (
              <TrendingDown size={32} className="text-red-500" />
            )}
          </div>
          <p className="text-[10px] font-bold text-emerald-950/30 mt-2 uppercase">
            Paid deployments
          </p>
        </div>
      </div>

      {/* ANALYTICS VISUALIZATION */}
      <div className={brutalistCard}>
        <div className="flex items-center justify-between mb-8 border-b-2 border-emerald-950 pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-emerald-950" />
            <h3 className="text-xl font-black uppercase italic text-emerald-950">
              Yield Distribution
            </h3>
          </div>
          <span className="text-[10px] font-black text-emerald-900/40 uppercase">
            Monetized Missions Only
          </span>
        </div>

        <div className="h-[350px] w-full bg-emerald-50/20 p-4 border border-emerald-950/5">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#064e3b15"
                />
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
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  cursor={{ fill: "#facc1520" }}
                  contentStyle={{
                    border: "4px solid #064e3b",
                    borderRadius: "0",
                    fontWeight: "900",
                    textTransform: "uppercase",
                    fontSize: "10px",
                  }}
                />
                <Bar dataKey="revenue" radius={0}>
                  {chartData.map((_, index) => (
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
            <div className="h-full w-full flex items-center justify-center bg-emerald-50 animate-pulse border-2 border-emerald-950/10">
              <p className="text-[10px] font-black uppercase text-emerald-900/20">
                Decrypting Financial Data...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* TRANSACTION LEDGER */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <TableIcon size={18} className="text-emerald-950" />
          <h3 className="text-xl font-black uppercase italic text-emerald-950 underline decoration-amber-400 underline-offset-4">
            Transaction Ledger
          </h3>
        </div>

        <div className="overflow-x-auto border-4 border-emerald-950 shadow-[10px_10px_0px_0px_rgba(6,78,59,1)]">
          <table className="w-full text-left border-collapse bg-white">
            <thead>
              <tr className="bg-emerald-950 text-white uppercase text-[10px] font-black tracking-widest italic">
                <th className="p-4 border-r border-white/10">
                  Mission Parameters
                </th>
                <th className="p-4 border-r border-white/10 text-center">
                  Unit Fee
                </th>
                <th className="p-4 border-r border-white/10 text-center">
                  PAX Load
                </th>
                <th className="p-4 text-right bg-amber-400 text-emerald-950">
                  Net Yield
                </th>
              </tr>
            </thead>
            <tbody>
              {eventsWithRevenue.map((event, idx) => (
                <tr
                  key={idx}
                  className="border-b-2 border-emerald-950 hover:bg-emerald-50 transition-colors group"
                >
                  <td className="p-4 font-black uppercase italic text-emerald-950 border-r-2 border-emerald-950">
                    <div className="flex flex-col">
                      <span>{event.name}</span>
                      <span className="text-[8px] opacity-40 not-italic tracking-normal">
                        Status: {event.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center font-mono font-bold border-r-2 border-emerald-950">
                    ${event.fee.toFixed(2)}
                  </td>
                  <td className="p-4 text-center font-black border-r-2 border-emerald-950">
                    {event.pax}
                  </td>
                  <td className="p-4 text-right font-black italic text-emerald-950 group-hover:bg-amber-100 transition-colors">
                    $
                    {event.revenue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              ))}
              {eventsWithRevenue.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-12 text-center text-emerald-900/20 font-black uppercase italic"
                  >
                    No financial activity recorded.
                  </td>
                </tr>
              )}
            </tbody>
            {eventsWithRevenue.length > 0 && (
              <tfoot>
                <tr className="bg-emerald-50 border-t-4 border-emerald-950">
                  <td
                    colSpan={3}
                    className="p-4 text-right font-black uppercase italic border-r-2 border-emerald-950"
                  >
                    Consolidated Yield
                  </td>
                  <td className="p-4 text-right font-black text-2xl italic text-emerald-950 bg-amber-300">
                    $
                    {totalEarnings.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
