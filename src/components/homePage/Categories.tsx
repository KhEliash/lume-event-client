"use client";
import { Zap, ArrowRight, Crosshair, Box } from "lucide-react";
import Link from "next/link";

const cats = [
  {
    name: "Sports",
    id: "01",
    icon: <Crosshair />,
    desc: "High-performance physical deployments.",
  },
  {
    name: "Gaming",
    id: "02",
    icon: <Zap />,
    desc: "Digital sector synchronization.",
  },
  {
    name: "Art",
    id: "03",
    icon: <Box />,
    desc: "Creative manifest visualization.",
  },
  {
    name: "Hiking",
    id: "04",
    icon: <ArrowRight />,
    desc: "Exterior terrain reconnaissance.",
  },
];

export default function Categories() {
  return (
    <section className="min-h-screen bg-[#f0f2f0] px-4 py-20 md:px-10 border-b-10 md:border-b-12 border-emerald-950 relative overflow-hidden">
      {/* SECTION HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">
            <span className="w-8 h-0.5 bg-emerald-600" /> Sector_Classification
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-[10vw] font-black uppercase italic text-emerald-950 leading-[0.8] tracking-tighter">
            SECTORS<span className="text-amber-500">.</span>
          </h2>
        </div>
        <p className="max-w-60 text-[10px] font-bold uppercase tracking-widest text-emerald-950/40 leading-relaxed border-l-2 border-emerald-950/10 pl-4">
          All missions are categorized by operational theater. Select a sector
          to begin uplink.
        </p>
      </div>

      {/* CATEGORY GRID */}
      <div className="grid grid-cols-1  lg:grid-cols-4 gap-0 border-4 border-emerald-950 bg-emerald-950 shadow-[16px_16px_0px_0px_rgba(6,78,59,0.1)]">
        {cats.map((cat, i) => (
          <Link
            href={"/events"}
            key={cat.name}
            className={`
              relative h-[400px] md:h-[500px] p-8 bg-white border-emerald-950 
              flex flex-col justify-between group cursor-pointer overflow-hidden
              transition-all duration-500
              ${i !== cats.length - 1 ? "lg:border-r-4" : ""} 
              ${i < 2 ? "border-b-4 lg:border-b-0" : "border-b-4 "}
              hover:bg-amber-400
            `}
          >
            {/* Background Decorative ID */}
            <span className="absolute -right-4 -top-8 text-[12rem] font-black italic text-emerald-950/5 group-hover:text-emerald-950/10 transition-colors select-none">
              {cat.id}
            </span>

            {/* Top Bar */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 border-2 border-emerald-950 flex items-center justify-center group-hover:bg-emerald-950 group-hover:text-white transition-all duration-300">
                {cat.icon}
              </div>
              <span className="font-mono text-[10px] font-black text-emerald-950/30 group-hover:text-emerald-950 tracking-tighter">
                REF_SYS_{cat.id}A
              </span>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-5xl font-black uppercase italic text-emerald-950 mb-4 transition-transform duration-500 group-hover:-translate-y-2">
                {cat.name}
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-950/50 group-hover:text-emerald-950 leading-loose max-w-[180px]">
                {cat.desc}
              </p>
            </div>

            {/* Action Bar (Blueprint Style) */}
            <div className="relative z-10 pt-6 border-t border-emerald-950/10 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase italic text-emerald-950 group-hover:tracking-[0.2em] transition-all">
                Explore_Sector
              </span>
              <div className="w-8 h-8 rounded-full border-2 border-emerald-950 flex items-center justify-center group-hover:bg-emerald-950 group-hover:text-amber-400 transition-all">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Scan Line Animation (Visible on Hover) */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-emerald-950/20 animate-scan" />
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          100% {
            top: 100%;
          }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </section>
  );
}
