/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Head from "next/head";
import React from "react";
import { Heart, Zap, Globe, Quote } from "lucide-react";
import Link from "next/link";
// import { cn } from "@/lib/utils";

export default function About() {
  return (
    <>
      <Head>
        <title>The Lume Narrative | Architecture of Connection</title>
      </Head>

      <main className=" min-h-screen">
        {/* --- 1. HERO SECTION: The Statement --- */}
        <section className="relative py-16 md:py-24  px-4 md:px-10 border-b-2 border-emerald-950/5 ">
          <div className=" mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <span className="text-amber-500 font-black uppercase tracking-[0.5em] text-xs mb-6 block">
                  Est. 2025 — The Lume Manifesto
                </span>
                <h1 className="text-7xl md:text-9xl font-black text-emerald-950 leading-[0.8] uppercase tracking-tighter">
                  Less{" "}
                  <span
                    className="text-transparent border-t-emerald-950 border-t-2 inline-block leading-none italic"
                    style={{ WebkitTextStroke: "1px #064e3b" }}
                  >
                    Noise
                  </span>
                  <br />
                  More <span className="text-amber-500">Pulse.</span>
                </h1>
              </div>
              <div className="md:w-1/3 pb-4">
                <p className="text-emerald-900/60 font-bold uppercase tracking-widest text-xs leading-relaxed border-l-2 border-amber-400 pl-6">
                  We are the architects of the &quot;Passion Economy.&quot; A
                  dedicated ecosystem where premium events meet intentional
                  audiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- 2. OUR STORY: The Visual Narrative --- */}
        <section className="py-24 px-6">
          <div className=" mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: Artistic Geometry */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-4/5 bg-emerald-950 flex flex-col justify-between p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400 -translate-y-16 translate-x-16 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                <div className="z-10">
                  <Quote className="text-amber-400 w-12 h-12 mb-6" />
                  <h2 className="text-4xl font-black text-white uppercase tracking-tighter leading-none">
                    Connection isn&apos;t <br />
                    <span className="text-amber-400">Digital.</span> <br />
                    It&apos;s Physical.
                  </h2>
                </div>
                <div className="z-10 border-t border-white/20 pt-6">
                  <p className="text-emerald-100/50 text-xs font-black uppercase tracking-[0.3em]">
                    Our Philosophy
                  </p>
                </div>
              </div>
            </div>

            {/* Right: The Content */}
            <div className="lg:col-span-7 space-y-10">
              <h3 className="text-emerald-950 text-xs font-black uppercase tracking-[0.4em] flex items-center gap-4">
                <span className="w-12 h-0.5 bg-amber-400" /> The Genesis
              </h3>
              <div className="space-y-8">
                <p className="text-4xl md:text-5xl font-black text-emerald-950 uppercase tracking-tighter leading-none">
                  Lume was built to bridge the gap between{" "}
                  <span className="text-amber-500">Screen Time</span> and{" "}
                  <span className="text-emerald-800 italic">Real Time.</span>
                </p>
                <div className="grid md:grid-cols-2 gap-8 text-emerald-900/70 font-medium">
                  <p>
                    In an age of hyper-connectivity, we found ourselves
                    increasingly disconnected from our local soil. Lume emerged
                    as a response—a platform that prioritizes the curator, the
                    host, and the seeker.
                  </p>
                  <p>
                    We provide the infrastructure for excellence. From
                    underground jazz sessions to high-tier tech summits, we
                    ensure the &quot;Pulse&quot; of the city is always within
                    your reach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. THE VALUES: Neobrutalist Cards --- */}
        <section className="py-24 bg-emerald-950 relative overflow-hidden">
          <div className=" mx-auto px-6 relative z-10">
            <div className="mb-20">
              <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-center">
                The Pillars<span className="text-amber-400">.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10">
              {[
                {
                  icon: <Heart />,
                  title: "Authenticity",
                  desc: "No noise, no fluff. We verify every curator to ensure Lume remains a sanctuary for genuine human experience.",
                },
                {
                  icon: <Zap />,
                  title: "Empowerment",
                  desc: "Turning passion into legacy. We provide the tools for hosts to build sustainable, scalable communities.",
                },
                {
                  icon: <Globe />,
                  title: "Inclusion",
                  desc: "Shared interests transcend borders. Lume is a home for every subculture, hobby, and niche.",
                },
              ].map((val, i) => (
                <div
                  key={i}
                  className="p-12 bg-emerald-950 hover:bg-emerald-900 transition-colors group"
                >
                  <div className="text-amber-400 mb-8 group-hover:scale-110 transition-transform origin-left">
                    {React.cloneElement(val.icon as React.ReactElement<any>, {
                      size: 32,
                      strokeWidth: 2.5,
                    })}{" "}
                  </div>
                  <h4 className="text-white text-2xl font-black uppercase tracking-tighter mb-4">
                    {val.title}
                  </h4>
                  <p className="text-emerald-100/40 text-sm leading-relaxed font-bold uppercase tracking-wider">
                    {val.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. THE METRICS: Editorial Data --- */}
        <section className="py-24 bg-white border-b-2 border-emerald-950">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-between gap-12">
              {[
                { label: "Successful Events", val: "1k+" },
                { label: "Community Members", val: "30k+" },
                { label: "Cities Reached", val: "45" },
                { label: "Host Satisfaction", val: "98%" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-emerald-950 text-7xl font-black tracking-tighter">
                    {stat.val}
                  </span>
                  <span className="text-amber-600 text-xs font-black uppercase tracking-[0.3em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 5. CALL TO ACTION: The Final Signature --- */}
        <section className="py-32 md:px-6 text-center">
          <div className=" mx-auto space-y-10">
            <h2 className="text-5xl md:text-7xl font-black text-emerald-950 uppercase tracking-tighter leading-none">
              Ready to <br />{" "}
              <span className="bg-amber-400 px-4">Illuminate</span> your city?
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <Link href={"/login"}>
                <button className="cursor-pointer px-12 py-5 bg-emerald-950 text-white font-black uppercase tracking-[0.2em] text-sm hover:translate-x-2 hover:-translate-y-2 transition-transform shadow-[10px_10px_0px_0px_rgba(251,191,36,1)] active:shadow-none active:translate-x-0 active:translate-y-0">
                  Join as a Host
                </button>
              </Link>
              <Link href={"/events"}>
                <button className="cursor-pointer px-12 py-5 border-2 border-emerald-950 text-emerald-950 font-black uppercase tracking-[0.2em] text-sm hover:bg-emerald-950 hover:text-white transition-all">
                  Explore Events
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
