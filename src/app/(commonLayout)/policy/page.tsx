"use client";

import React from "react";
import Head from "next/head";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Data Collection",
      icon: <Eye size={20} />,
      content:
        "We collect information necessary to provide a premium event experience. This includes your name, email address, and professional interests to curate your personalized 'Pulse' feed.",
    },
    {
      title: "Information Usage",
      icon: <FileText size={20} />,
      content:
        "Your data allows us to facilitate ticket transactions, verify host credentials, and improve our platform's architecture. We do not sell your personal narratives to third-party brokers.",
    },
    {
      title: "Security Protocols",
      icon: <Lock size={20} />,
      content:
        "Lume employs high-tier encryption for all financial transactions and personal data storage. Our infrastructure is designed to protect the 'Passion Economy' from unauthorized access.",
    },
    {
      title: "Your Rights",
      icon: <ShieldCheck size={20} />,
      content:
        "You retain full ownership of your data. You may request a digital export of your information or a permanent deletion of your account and associated pulse history at any time.",
    },
  ];

  return (
    <>
      <Head>
        <title>Privacy Architecture | Lume</title>
      </Head>

      <main className="bg-white min-h-screen py-16 md:py-24 px-4 md:px-10">
        <div className=" mx-auto">
          {/* --- Navigation --- */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-900/40 hover:text-amber-500 transition-colors mb-12"
          >
            <ArrowLeft size={14} /> Back to Hub
          </Link>

          {/* --- Header --- */}
          <div className="mb-20">
            <h1 className="text-4xl md:text-7xl font-black text-emerald-950 uppercase tracking-tighter leading-none mb-6">
              Privacy <br />{" "}
              <span className="text-amber-400">Architecture.</span>
            </h1>
            <p className="text-sm font-bold text-emerald-900/40 uppercase tracking-[0.3em]">
              Last Modified: December 2025
            </p>
          </div>

          {/* --- The "Plain English" Summary --- */}
          <div className="p-8 md:p-12 bg-emerald-950 text-white border-b-8 border-amber-400 mb-20 shadow-[20px_20px_0px_0px_rgba(6,78,59,0.1)]">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-amber-400">
              Our Privacy Philosophy
            </h2>
            <p className="text-lg text-emerald-100/70 leading-relaxed italic">
              &quot;We believe privacy is a fundamental component of human
              connection. We design our systems to be as transparent as our
              community.&quot;
            </p>
          </div>

          {/* --- Policy Sections --- */}
          <div className="space-y-16">
            {sections.map((section, i) => (
              <section
                key={i}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 border-t border-emerald-950/5 pt-12"
              >
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-400 text-emerald-950 rounded-br-lg rounded-tl-lg">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-emerald-950">
                      {section.title}
                    </h3>
                  </div>
                </div>
                <div className="md:col-span-8">
                  <p className="text-emerald-900/70 leading-relaxed font-medium">
                    {section.content}
                  </p>
                </div>
              </section>
            ))}
          </div>

          {/* --- Legal Contact --- */}
          <div className="mt-32 p-10 border-2 border-emerald-950 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none select-none overflow-hidden font-black text-[12rem] flex items-center justify-center leading-none">
              LEGAL
            </div>
            <h4 className="text-lg font-black uppercase tracking-widest text-emerald-950 mb-4 relative z-10">
              Questions regarding our terms?
            </h4>
            <p className="text-emerald-900/60 mb-6 relative z-10 font-medium">
              Our legal concierge is available for clarification.
            </p>
            <a
              href="mailto:eliashebrahim@gmail.com"
              className="relative z-10 inline-block text-amber-600 font-black uppercase tracking-widest text-xs border-b-2 border-amber-400 pb-1 hover:text-emerald-950 transition-colors"
            >
              eliashebrahim@gmail.com
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
