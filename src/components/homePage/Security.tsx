/* eslint-disable react/jsx-no-comment-textnodes */
 import { ShieldCheck, Lock, Eye, Terminal, Fingerprint, ShieldAlert } from "lucide-react";
import React from "react";

const PROTOCOLS = [
  { 
    icon: Lock, // Pass the component itself, not the element
    title: "Escrow_Secure", 
    code: "PX-88", 
    desc: "Funds are locked in a multi-sig vault until mission validation is confirmed by all parties." 
  },
  { 
    icon: ShieldCheck, 
    title: "Vetted_Operators", 
    code: "VX-02", 
    desc: "Every host undergoes a mandatory identity and reputation audit before deployment authorization." 
  },
  { 
    icon: Eye, 
    title: "Total_Stealth", 
    code: "SX-99", 
    desc: "End-to-end encryption for all coordination logs. Your data is purged post-mission." 
  }
];

export default function Security() {
  return (
    <section className="min-h-screen bg-white flex flex-col justify-center px-4 md:px-10  border-b-10 md:border-b-12 border-emerald-950 py-16 md:py-24 relative overflow-hidden">
      
      {/* 1. HEADER: Dynamic scaling for mobile */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-20 gap-8 relative z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-950 text-white px-3 py-1 font-black uppercase text-[10px] tracking-widest italic">
            <ShieldAlert size={14} className="text-amber-400" /> Security_Manifest_v4.0
          </div>
          <p className="text-5xl  md:text-8xl  font-black uppercase italic text-emerald-950 leading-[0.8] tracking-tighter">
            PROT<span className="text-transparent" style={{ WebkitTextStroke: "2px #064e3b" }}>OCOLS.</span>
          </p>
        </div>
        
        {/* Technical readout hidden on small mobile, visible on tablet+ */}
        <div className="hidden  bg-emerald-50 border-2 border-emerald-950 p-4 font-mono text-[10px] text-emerald-950 leading-relaxed uppercase shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]">
          // STATUS: DEFENSE_GRID_ACTIVE <br />
          // UPLINK: STABLE <br />
          // ENCRYPTION: AES-256
        </div>
      </div>

      {/* 2. THE TACTICAL GRID: Vertical on mobile, Horizontal on LG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 border-4 border-emerald-950 divide-y-4 lg:divide-y-0 lg:divide-x-4 divide-emerald-950 bg-emerald-950 shadow-[10px_10px_0px_0px_rgba(6,78,59,0.1)] md:shadow-[20px_20px_0px_0px_rgba(6,78,59,0.1)] relative z-10">
        {PROTOCOLS.map((item, i) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={i} 
              className="group bg-white p-6  space-y-8 hover:bg-emerald-50 transition-colors relative overflow-hidden"
            >
              {/* Top Meta Info */}
              <div className="flex justify-between items-start">
                 <div className="w-14 h-14  bg-emerald-950 text-amber-400 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                   <IconComponent size={32} />
                 </div>
                 <span className="text-[10px] font-black font-mono text-emerald-950/30 group-hover:text-emerald-950">
                   TAG_{item.code}
                 </span>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h4 className="text-2xl md:text-3xl lg:text-[10vw] font-black uppercase italic text-emerald-950 tracking-tighter">
                  {item.title}
                </h4>
                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-950/60 leading-relaxed max-w-xs">
                  {item.desc}
                </p>
              </div>

              {/* Bottom Technical Bar */}
              <div className="pt-6 border-t-2 border-emerald-950/10 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Fingerprint size={16} className="text-emerald-600" />
                    <span className="text-[9px] font-black uppercase italic text-emerald-950/40">Verified_Node</span>
                 </div>
                 <Terminal size={16} className="text-emerald-950/20 group-hover:text-emerald-950 transition-colors" />
              </div>

              {/* Texture Overlay (Using Tailwind for no-import safety) */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />
            </div>
          );
        })}
      </div>

      {/* 3. DECORATIVE BACKGROUND TEXT: Responsive sizing to prevent horizontal scroll */}
      <div className="absolute -left-4 bottom-0 opacity-[0.03] select-none text-[10rem]  lg:text-[25rem] font-black italic uppercase leading-[0.7] pointer-events-none translate-y-1/4">
        SAFE
      </div>
    </section>
  );
}