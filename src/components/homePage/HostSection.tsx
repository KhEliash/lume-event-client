 import { Button } from "@/components/ui/button";
import { BarChart3, ArrowUpRight, ChevronRight, Fingerprint, Activity } from "lucide-react";
import Link from "next/link";

export default function HostSection() {
  return (
    <section className="min-h-screen lg:min-h-[85vh] bg-[#fafafa] relative border-b-8 md:border-b-12 border-emerald-950 overflow-hidden">
      
      {/* BACKGROUND DECOR (Visible only on larger screens for cleanliness) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none hidden md:block" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23064e3b' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      <div className=" mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        
        {/* LEFT: CONTENT BLOCK */}
        <div className="lg:col-span-7 px-4 py-16 md:px-10 md:py-24  flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-emerald-950/10">
          
          {/* Status Tag */}
          <div className="flex items-center gap-3 mb-6 md:mb-10">
            <div className="bg-emerald-950 p-2 text-amber-400">
              <Fingerprint size={18} />
            </div>
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-emerald-950/40">
              Access_Level: Admin_001
            </span>
          </div>

          {/* Heading with Responsive Text Sizes */}
          <h2 className="text-5xl  md:text-8xl lg:text-[8.5vw] font-black uppercase italic leading-[0.85] md:leading-[0.8] text-emerald-950 tracking-tighter mb-8 md:mb-12">
            HOST <br /> 
            <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #064e3b" }}>THE VOID.</span>
          </h2>

          <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-start">
            <div className="max-w-md space-y-4 md:space-y-6">
              <p className="text-base md:text-xl font-bold text-emerald-950/80 uppercase leading-tight">
                Direct payouts. Zero fluff. Track your community growth with our raw data engine.
              </p>
              
              {/* Feature Tags - Hidden on tiny screens, flex on mobile+ */}
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-2">
                 {['Proprietary Yield', 'Instant Liquidity', 'Global Reach'].map((item) => (
                   <div key={item} className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase text-emerald-600">
                      <ChevronRight size={14} strokeWidth={3} /> {item}
                   </div>
                 ))}
              </div>
            </div>
            
            {/* CTA Button - Full width on mobile */}
            <Link href="/register">
            <Button size="lg" className="w-full md:w-auto group h-20 md:h-24 px-8 md:px-12 bg-emerald-950 text-white rounded-none font-black uppercase italic text-lg md:text-2xl shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] md:shadow-[12px_12px_0px_0px_rgba(251,191,36,1)] transition-all hover:translate-x-1 hover:translate-y-1 md:hover:translate-x-2 md:hover:translate-y-2 hover:shadow-none relative overflow-hidden active:scale-95">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Initialize <ArrowUpRight className="" />
              </span>
              <div className="absolute inset-0 bg-emerald-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Button>
            </Link>
          </div>
        </div>

        {/* RIGHT: TACTICAL DATA BENTO */}
        <div className="lg:col-span-5 bg-emerald-50/30 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center">
          <div className="relative group w-full max-w-md mx-auto lg:max-w-none">
            
            {/* Shadow Box (Hidden/Simplified on Mobile to prevent overflow issues) */}
            <div className="absolute inset-0 bg-emerald-950 translate-x-3 translate-y-3 md:translate-x-6 md:translate-y-6 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1" />
            
            {/* The Main UI Card */}
            <div className="relative border-[3px] md:border-4 border-emerald-950 bg-white p-6 md:p-10 space-y-6 md:space-y-8">
              
              {/* Card Header */}
              <div className="flex justify-between items-start border-b-[3px] md:border-b-4 border-emerald-950 pb-4 md:pb-6">
                <div>
                  <label className="text-[8px] md:text-[10px] font-black uppercase text-emerald-950/40 block mb-1 tracking-widest italic leading-none">Status: Online</label>
                  <span className="font-black italic text-2xl md:text-3xl text-emerald-950 leading-none">LIVE_METRICS</span>
                </div>
                <Activity size={32} className="text-amber-500 animate-pulse md:w-12 md:h-12" />
              </div>

              {/* Data Points */}
              <div className="space-y-5 md:space-y-6">
                <div className="flex justify-between items-end">
                   <span className="text-[8px] md:text-[10px] font-black uppercase text-emerald-950/60 tracking-widest">Global_Yield</span>
                   <span className="font-black text-emerald-950 text-lg md:text-xl">+88.4%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-4 md:h-6 w-full bg-emerald-100 border-2 border-emerald-950 relative overflow-hidden">
                  <div className="absolute inset-0 bg-emerald-600 w-[88%] shadow-[inset_-2px_0px_0px_#064e3b]" />
                </div>
                
                {/* Small Info Grid */}
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div className="bg-emerald-950 p-3 md:p-4 text-white">
                    <span className="block text-[7px] md:text-[8px] font-black uppercase text-white/40 mb-1">Yield</span>
                    <span className="text-lg md:text-xl font-black italic text-amber-400">$2.4k</span>
                  </div>
                  <div className="bg-white border-[3px] border-emerald-950 p-3 md:p-4 text-emerald-950">
                    <span className="block text-[7px] md:text-[8px] font-black uppercase text-emerald-950/40 mb-1">Success</span>
                    <span className="text-lg md:text-xl font-black italic">99%</span>
                  </div>
                </div>

                {/* Footer of Card */}
                <div className="pt-4 border-t-2 border-emerald-950/10 flex items-center justify-between text-[8px] md:text-[10px] font-black uppercase italic text-emerald-950/40">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={12} />
                    <span>Sync_ID: 8829-X</span>
                  </div>
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}