import { Activity, Globe, Cpu, Radio, Lock } from "lucide-react";

export default function Diagnostics() {
  return (
    <section className="min-h-screen bg-white py-16 md:py-24 px-4 md:px-10 border-b-12 border-emerald-950 relative overflow-hidden">
      {/* 1. SECTION HEADER */}
      <div className="mb-16 space-y-2">
        <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.4em]">
          <span className="w-8 h-0.5 bg-emerald-600" /> System_Integrity_Check
        </div>
        <h2 className="text-4xl md:text-8xl font-black uppercase italic text-emerald-950 tracking-tighter">
          CORE
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "2px #064e3b" }}
          >
            _NODES.
          </span>
        </h2>
      </div>

      {/* 2. THE DIAGNOSTIC BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Large Visual: The "Map" */}
        <div className="md:col-span-4 lg:col-span-4 h-[400px] border-4 border-emerald-950 bg-emerald-950 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

          {/* Fake Radar/Map Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-white/10 rounded-full animate-ping" />
            <div className="absolute w-[200px] h-[200px] border border-white/20 rounded-full" />
            <div className="absolute w-[100px] h-[100px] border border-amber-400/40 rounded-full" />
            <Globe size={80} className="text-white opacity-10" />
          </div>

          <div className="absolute bottom-6 left-6 space-y-1">
            <span className="block text-amber-400 font-mono text-[10px] font-black uppercase tracking-widest">
              Global_Relay_Active
            </span>
            <span className="block text-white text-2xl font-black uppercase italic">
              Primary_Grid
            </span>
          </div>

          <div className="absolute top-6 right-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-1 h-4 bg-amber-400 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Metric 1: Uplink */}
        <div className="md:col-span-2 lg:col-span-2 border-4 border-emerald-950 p-8 flex flex-col justify-between hover:bg-emerald-50 transition-colors">
          <Radio className="text-emerald-950" size={32} />
          <div>
            <span className="text-[10px] font-black text-emerald-950/40 uppercase block mb-2">
              Signal_Strength
            </span>
            <span className="text-5xl font-black italic text-emerald-950 tracking-tighter">
              99.2%
            </span>
          </div>
        </div>

        {/* Metric 2: Encryption */}
        <div className="md:col-span-2 lg:col-span-2 border-4 border-emerald-950 p-8 flex flex-col justify-between bg-amber-400 group">
          <Lock className="text-emerald-950" size={32} />
          <div>
            <span className="text-[10px] font-black text-emerald-950 uppercase block mb-2">
              Security_Layer
            </span>
            <span className="text-4xl font-black italic text-emerald-950 uppercase">
              Encrypted
            </span>
          </div>
        </div>

        {/* Metric 3: Processing */}
        <div className="md:col-span-2 lg:col-span-2 border-4 border-emerald-950 p-8 flex flex-col justify-between hover:bg-emerald-50 transition-colors">
          <Cpu className="text-emerald-950" size={32} />
          <div>
            <span className="text-[10px] font-black text-emerald-950/40 uppercase block mb-2">
              Compute_Load
            </span>
            <div className="flex items-end gap-2">
              <span className="text-5xl font-black italic text-emerald-950 tracking-tighter">
                0.04
              </span>
              <span className="text-xl font-black text-emerald-500 mb-1">
                MS
              </span>
            </div>
          </div>
        </div>

        {/* Metric 4: Activity Stream */}
        <div className="md:col-span-4 lg:col-span-2 border-4 border-emerald-950 p-8 bg-emerald-950 text-white overflow-hidden relative">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <Activity className="text-amber-400" size={32} />
            <div className="space-y-1">
              <div className="h-1 w-full bg-white/10 overflow-hidden">
                <div className="h-full bg-emerald-400 w-2/3 animate-[scan_2s_linear_infinite]" />
              </div>
              <span className="text-[9px] font-mono text-white/40 uppercase tracking-tighter">
                Buffer_Stream_001_A
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. FOOTER TAG */}
      <div className="mt-8 flex justify-between items-center text-[10px] font-black uppercase italic text-emerald-950/30 tracking-[0.3em]">
        <span>Hardware_Acceleration: Enabled</span>
        <span className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full" /> Synchronized
        </span>
      </div>
    </section>
  );
}
