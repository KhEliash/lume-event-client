/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpRight, Database, Globe, Hash, Zap } from "lucide-react";
import Link from "next/link";

export default function RecentRegistry({ events }: { events: any[] }) {
  return (
    <section className="min-h-screen bg-[#fafafa] px-4 py-20 md:px-10  border-b-10 md:border-b-12 border-emerald-950 relative overflow-hidden">
      {/* 1. HEADER: TACTICAL OVERVIEW */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 relative z-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 border-2 border-emerald-950 flex items-center justify-center shadow-[4px_4px_0px_0px_#064e3b]">
              <Database size={18} className="text-emerald-950" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-950/40 italic">
              System // Global // Manifest_Logs
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl lg:text-[10vw] font-black uppercase italic text-emerald-950 leading-[0.8] tracking-tighter">
            THE{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "2px #064e3b" }}
            >
              LEDGER.
            </span>
          </h2>
        </div>

        <Link href="/events" className="group">
          <div className="bg-emerald-950 text-white px-8 py-4 font-black uppercase italic flex items-center gap-4 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
            Access Full Database{" "}
            <ArrowUpRight className="group-hover:rotate-45 transition-transform" />
          </div>
        </Link>
      </div>

      {/* 2. THE LEDGER GRID (RESPONSIVE) */}
      <div className="border-4 border-emerald-950 bg-white relative z-10 overflow-hidden shadow-[20px_20px_0px_0px_rgba(6,78,59,0.05)]">
        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:grid grid-cols-12 bg-emerald-950 p-6 gap-4">
          <div className="col-span-1 text-amber-400 font-black text-[10px] uppercase italic">
            #ID
          </div>
          <div className="col-span-5 text-white font-black text-[10px] uppercase italic">
            Mission_Identity
          </div>
          <div className="col-span-2 text-white font-black text-[10px] uppercase italic">
            Sector
          </div>
          <div className="col-span-2 text-white font-black text-[10px] uppercase italic text-center">
            Load_PAX
          </div>
          <div className="col-span-2 text-amber-400 font-black text-[10px] uppercase italic text-right">
            Yield
          </div>
        </div>

        {/* Data Rows */}
        <div className="divide-y-4 divide-emerald-950/10">
          {events.map((event, i) => (
            <Link
              href={`/event/${event._id}`}
              key={event._id}
              className="grid grid-cols-1 md:grid-cols-12 p-6 md:p-8 gap-4 items-center group hover:bg-emerald-50 transition-colors"
            >
              {/* Mobile ID Tag */}
              <div className="md:col-span-1">
                <span className="bg-emerald-100 text-emerald-950 px-2 py-1 font-mono text-[10px] font-black">
                  {i < 9 ? `0${i + 1}` : i + 1}
                </span>
              </div>

              {/* Identity Column */}
              <div className="md:col-span-5 flex flex-col gap-1">
                <h4 className="text-2xl md:text-3xl font-black uppercase italic text-emerald-950 group-hover:text-emerald-700 transition-colors">
                  {event.name}
                </h4>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-950/40 uppercase tracking-widest">
                    <Globe size={10} /> {event.location?.city || "Remote"}
                  </span>
                  <span className="text-[9px] font-bold text-emerald-950/40 opacity-30">
                    //
                  </span>
                  <span className="text-[9px] font-bold text-emerald-950/40 uppercase tracking-widest italic">
                    Lat_{event._id.charCodeAt(0) % 90}° {event._id.charCodeAt(1) % 60}&apos; N
                  </span>
                </div>
              </div>

              {/* Sector Column */}
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 border-2 border-emerald-950 px-3 py-1 bg-white group-hover:bg-amber-400 transition-colors">
                  <Zap size={12} className="text-emerald-950" />
                  <span className="text-[10px] font-black uppercase italic">
                    {event.type}
                  </span>
                </div>
              </div>

              {/* PAX Load Column */}
              <div className="md:col-span-2 text-left md:text-center">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-emerald-950/40 md:hidden uppercase mb-1 tracking-widest">
                    Load_Factor
                  </span>
                  <span className="font-black text-xl text-emerald-950">
                    {event.currentParticipants}
                    <span className="text-emerald-950/20">/</span>
                    {event.maxParticipants}
                  </span>
                </div>
              </div>

              {/* Price Column */}
              <div className="md:col-span-2 text-left md:text-right">
                <div className="flex flex-col md:items-end">
                  <span className="text-[10px] font-black text-amber-600 italic">
                    {event.joiningFee > 0
                      ? `$${event.joiningFee.toFixed(2)}`
                      : "AUTH_FREE"}
                  </span>
                  <span className="text-[8px] font-black uppercase text-emerald-950/20 tracking-tighter">
                    NET_SETTLEMENT
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. DECORATIVE SIDEBAR (Hidden on small screens) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-20 opacity-10 pointer-events-none xl:flex pr-4">
        <Hash size={40} />
        <Hash size={40} />
        <Hash size={40} />
      </div>

      {/* BACKGROUND DECOR */}
      <div className="absolute bottom-10 left-10 text-[10px] font-black uppercase tracking-[0.8em] text-emerald-950/5 rotate-90 origin-left select-none">
        ENCRYPTED_DATA_STREAM_00921-X
      </div>
    </section>
  );
}
