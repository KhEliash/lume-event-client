import { TrendingUp, Landmark, ShieldCheck } from "lucide-react";

export default function Treasury() {
  return (
    <section className="min-h-[70vh] bg-emerald-950 text-white relative border-b-12 border-emerald-950 overflow-hidden flex flex-col justify-center">
      {/* 1. BACKGROUND GRID & NOISE */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fbbf24 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* 2. TOP TECHNICAL DECOR */}
      <div className="absolute top-0 left-0 w-full px-4 md:px-10 flex justify-between items-start opacity-30">
        <div className="flex gap-4 items-center">
          <Landmark size={20} />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">
            Vault_Sector_09
          </span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black uppercase tracking-widest">
            Auth_Status: Encrypted
          </span>
          <span className="block text-[10px] font-mono">
            TS_ID: {new Date().getFullYear()}-882-LUME
          </span>
        </div>
      </div>

      <div className=" mx-auto px-4 md:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-center">
          {/* LEFT: The Big Numbers */}
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-400 text-emerald-950 px-3 py-1 font-black uppercase text-[10px] italic">
              <TrendingUp size={14} /> Ecosystem_Liquidity
            </div>

            <h2 className="text-[18vw] lg:text-[14vw] font-black uppercase italic leading-none text-amber-400 tracking-tighter filter drop-shadow-[8px_8px_0px_#064e3b]">
              $50K<span className="text-white">+</span>
            </h2>

            <p className="text-2xl md:text-4xl font-black uppercase italic tracking-tight text-white/90">
              Circulated in the{" "}
              <span className="underline decoration-amber-400 decoration-4">
                Ecosystem
              </span>
            </p>
          </div>

          {/* RIGHT: Status Card */}
          <div className="lg:col-span-4 border-4 border-white/20 bg-emerald-900/40 p-8 backdrop-blur-md relative">
            {/* Scanline using Tailwind arbitrary value to avoid Build Error */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="w-full h-0.5 bg-amber-400/20 absolute top-0 left-0 animate-[scan_3s_linear_infinite]" />
            </div>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-4 text-amber-400">
                <ShieldCheck size={40} strokeWidth={2.5} />
                <span className="text-sm font-black uppercase leading-none italic">
                  Verified // <br /> Immutable
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                  <span>Integrity_Score</span>
                  <span>100%</span>
                </div>
                <div className="h-2 w-full bg-white/10 border border-white/20">
                  <div className="h-full bg-amber-400 w-full shadow-[0_0_10px_#fbbf24]" />
                </div>
              </div>

              <p className="text-[10px] font-bold uppercase text-white/50 leading-relaxed italic">
                All transactions are processed via secure escrow protocols.
                Funds are only released upon successful mission deployment and
                validation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM DECORATIVE BAR */}
      <div className="absolute bottom-0 left-0 w-full h-2 flex">
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-emerald-600" />
      </div>
    </section>
  );
}
