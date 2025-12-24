"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
  Plus,
  Minus,
  //   HelpCircle,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const faqs = [
  {
    question: "How do I become a verified Lume Host?",
    answer:
      "Excellence is our baseline. To become a host, create an account and complete your profile. Our team reviews every application to ensure curators align with our 'Architecture of Connection' standards.",
    category: "Hosting",
  },
  {
    question: "What defines a 'Premium Event' on this platform?",
    answer:
      "A premium event isn't about price—it's about intentionality. Whether it's a local workshop or a high-tier gala, we look for events that offer genuine human connection and high curator engagement.",
    category: "General",
  },
  {
    question: "Are there fees for booking an event?",
    answer:
      "We believe in transparency. Lume charges a minimal service fee to maintain the infrastructure and ensure 24/7 support for both hosts and attendees.",
    category: "Billing",
  },
  {
    question: "How do I manage my tickets?",
    answer:
      "All your reservations are stored in your 'Digital Pass' section. You can access QR codes for entry, request refunds, or contact the host directly from your dashboard.",
    category: "General",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <Head>
        <title>Curated Support | Lume FAQ</title>
      </Head>

      <main className=" min-h-screen py-16 md:py-24 ">
        <div className=" mx-auto px-4 md:px-10">
          {/* --- Header Section --- */}
          <header className="mb-12 md:mb-20 border-l-4 md:border-l-8 border-amber-400 pl-4 md:pl-8">
            <span className="mb-3 block text-[10px] md:text-xs font-black uppercase tracking-[0.25em] md:tracking-[0.4em] text-amber-600">
              Knowledge Base
            </span>

            <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tight leading-[1.05] text-emerald-950">
              Questions
              <br className="hidden sm:block" />
              <span className="block italic text-emerald-900/20">
                Answered.
              </span>
            </h1>
          </header>

          {/* --- FAQ Accordion --- */}
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "border-2 border-emerald-950 transition-all duration-300",
                  openIndex === i
                    ? "shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] bg-white"
                    : "bg-emerald-50/30"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">
                      {faq.category}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-emerald-950 uppercase tracking-tight group-hover:text-emerald-700 transition-colors">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={cn(
                      "p-2 rounded-full transition-transform duration-500",
                      openIndex === i
                        ? "bg-emerald-950 text-white rotate-180"
                        : "bg-emerald-100 text-emerald-950"
                    )}
                  >
                    {openIndex === i ? <Minus size={24} /> : <Plus size={24} />}
                  </div>
                </button>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    openIndex === i
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="p-6 md:p-8 pt-0 border-t-2 border-emerald-950/5 text-emerald-900/70 font-medium leading-relaxed md:text-lg">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* --- Bottom Support CTA --- */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-950 p-10 text-white relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400 translate-x-12 -translate-y-12 rotate-45 group-hover:rotate-90 transition-transform duration-700" />
              <MessageCircle className="text-amber-400 mb-6 w-10 h-10" />
              <h3 className="text-2xl font-black uppercase tracking-tight mb-4">
                Direct Concierge
              </h3>
              <p className="text-emerald-100/50 text-sm mb-8 font-bold uppercase tracking-wider">
                Can&apos;t find what you need? Talk to our human support team.
              </p>
              <Link href={"/contact"}>
                <button className="flex items-center gap-2 text-amber-400 font-black uppercase tracking-widest text-xs hover:gap-4 transition-all">
                  Open Chat <ArrowUpRight size={16} />
                </button>
              </Link>
            </div>

            {/* <div className="border-2 border-emerald-950 p-10 flex flex-col justify-between hover:bg-emerald-50 transition-colors">
              <div>
                <HelpCircle className="text-emerald-950 mb-6 w-10 h-10" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-emerald-950">
                  Safety Center
                </h3>
                <p className="text-emerald-900/40 text-sm font-bold uppercase tracking-wider">
                  Learn about our community guidelines and security protocols.
                </p>
              </div>
              <Link href={"/faq"}>
                <button className="mt-8 text-emerald-950 font-black uppercase tracking-widest text-xs border-b-2 border-amber-400 w-fit pb-1 hover:text-amber-600 transition-colors">
                  View Guidelines
                </button>
              </Link>
            </div> */}
          </div>
        </div>
      </main>
    </>
  );
}
