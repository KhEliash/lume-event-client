/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Activity, Cpu, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveTicker({ events }: { events: any[] }) {
  const displayEvents = [...events, ...events, ...events];

  return (
    <div className="relative h-[12vh] bg-emerald-950 border-b-10 border-emerald-950 overflow-hidden flex items-center">
      <div className="absolute left-0 top-0 bottom-0 z-20 bg-amber-400 px-6 flex items-center border-r-4 border-emerald-950">
        <div className="flex flex-col items-center gap-1">
          <Radio size={18} className="text-emerald-950 animate-pulse" />
          <span className="text-[10px] font-black uppercase italic text-emerald-950 tracking-tighter">
            LIVE_FEED
          </span>
        </div>
      </div>

      <motion.div
        className="flex"
        animate={{
          x: ["0%", "-33.33%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
      >
        {displayEvents.map((event, i) => (
          <div
            key={i}
            className="flex items-center border-r border-white/10 px-12 h-full group/item hover:bg-white/5 transition-colors cursor-default"
          >
            {/* Index Tag */}
            <span className="text-[10px] font-mono text-amber-400/40 mr-4">
              [00{i % 99}]
            </span>

            {/* Event Details */}
            <div className="flex flex-col min-w-[200px]">
              <span className="text-xl font-black uppercase italic text-white tracking-tighter leading-none mb-1 group-hover/item:text-amber-400 transition-colors">
                {event.name || "UNNAMED_MISSION"}
              </span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[9px] font-black uppercase text-white/40 tracking-widest">
                  <Activity size={10} className="text-emerald-400" />
                  DEPLOYED: {event.currentParticipants || 0} PAX
                </span>
                <span className="text-white/20 text-[9px]">|</span>
                <span className="text-[9px] font-black uppercase text-amber-400 italic">
                  STATUS: {event.status || "ACTIVE"}
                </span>
              </div>
            </div>

            {/* Visual Separator Decor */}
            <div className="ml-12 opacity-20">
              <Cpu size={24} className="text-white rotate-45" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* 3. GRADIENT OVERLAY (Right Fade) */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-emerald-950 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
