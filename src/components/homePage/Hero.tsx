"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-[85vh] bg-emerald-950 text-white flex flex-col justify-center px-4 md:px-10 relative border-b-8 border-emerald-950 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <span className="text-amber-400 font-black uppercase tracking-[0.5em] mb-4 block italic">
          System // Lume // Initialized
        </span>
        <h1 className="text-[15vw] md:text-[12vw] font-black uppercase italic leading-[0.75] tracking-tighter mb-12">
          RAW <br />{" "}
          <span
            className="text-transparent stroke-white stroke-2"
            style={{ WebkitTextStroke: "2px white" }}
          >
            EVENTS.
          </span>
        </h1>
        <div className="flex flex-wrap gap-6">
          <Link href="/login">
            <Button className="h-16 px-10 bg-amber-400 text-emerald-950 border-4 border-emerald-950 rounded-none font-black uppercase italic text-xl shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all">
              Start Mission
            </Button>
          </Link>
          <Link href="/events">
            <Button
              variant="outline"
              className="h-16 px-10 bg-transparent text-white border-4 border-white rounded-none font-black uppercase italic text-xl hover:bg-white hover:text-emerald-950 transition-all"
            >
              View Ledger
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Background Decorative Text */}
      <div className="absolute right-[-5%] bottom-[-5%] opacity-5 select-none text-[30rem] font-black italic uppercase leading-none">
        LUME
      </div>
    </section>
  );
}
