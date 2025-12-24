
"use client";

import React from "react";
import Head from "next/head";
import { Gavel, Scale, AlertCircle, Ban, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TermsOfService() {
  const terms = [
    {
      id: "01",
      icon: <Gavel size={20} />,
      title: "The Agreement",
      content: "By accessing Lume, you agree to abide by our standards of community excellence. We provide the platform; you provide the intentionality. All users must be 18+ to host or purchase curated experiences."
    },
    {
      id: "02",
      icon: <Scale size={20} />,
      title: "Host Obligations",
      content: "Curators are responsible for the accuracy of their listings. Lume reserves the right to remove any 'Pulse' that does not meet our quality architecture or safety protocols."
    },
    {
      id: "03",
      icon: <AlertCircle size={20} />,
      title: "Cancellations",
      content: "Refunds are processed based on individual host policies. However, Lume's 'Excellence Guarantee' ensures a full refund if an event is canceled or significantly misrepresented."
    },
    {
      id: "04",
      icon: <Ban size={20} />,
      title: "Prohibited Conduct",
      content: "We have zero tolerance for 'Digital Noise'—spam, harassment, or fraudulent listings. Violation of these terms results in immediate and permanent architecture lockout."
    }
  ];

  return (
    <>
      <Head>
        <title>Terms of Excellence | Lume</title>
      </Head>

      <main className="bg-[#FCFCFC] min-h-screen py-12 md:py-24 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* --- Responsive Header --- */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20 border-b-2 border-emerald-950/10 pb-12">
            <div className="max-w-2xl">
              <h1 className="text-4xl  md:text-7xl font-black text-emerald-950 uppercase tracking-tighter leading-[0.85]">
                Terms of <br /> <span className="text-amber-500">Excellence.</span>
              </h1>
            </div>
            <div className="lg:max-w-xs">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-900/40 mb-2">Effective Date</p>
              <p className="text-lg font-bold text-emerald-950 underline decoration-amber-400">Dec 2025 v1.0</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* --- Left: Adaptive Sidebar (Hidden on mobile/tablet, visible on desktop) --- */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-24 h-fit">
              <nav className="space-y-4">
                {terms.map((t) => (
                  <a key={t.id} href={`#${t.id}`} className="flex items-center gap-4 group">
                    <span className="text-xs font-black text-amber-500">{t.id}</span>
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-950/40 group-hover:text-emerald-950 transition-colors">
                      {t.title}
                    </span>
                  </a>
                ))}
              </nav>
            </aside>

            {/* --- Right: Main Content (Full width on mobile/tablet) --- */}
            <div className="col-span-1 lg:col-span-9 space-y-20">
              {terms.map((item) => (
                <section key={item.id} id={item.id} className="scroll-mt-24">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="bg-emerald-950 text-amber-400 p-3 shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">
                      {item.id}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-emerald-950 mb-4">
                    {item.title}
                  </h3>
                  <p className="text-lg text-emerald-900/70 font-medium leading-relaxed max-w-3xl">
                    {item.content}
                  </p>
                </section>
              ))}
            </div>
          </div>

          {/* --- Responsive Footer CTA --- */}
          <div className="mt-32 p-6 sm:p-12 bg-amber-400 border-4 border-emerald-950 shadow-[10px_10px_0px_0px_rgba(6,78,59,1)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <h4 className="text-2xl font-black uppercase tracking-tighter text-emerald-950 text-center md:text-left">
                 Questions about our <br className="hidden md:block" /> legal framework?
               </h4>
               <Link href="/contact" className="w-full md:w-auto bg-emerald-950 text-white px-8 py-4 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:translate-x-1 hover:translate-y-1 transition-transform">
                 Contact Concierge <ArrowRight size={16} />
               </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}