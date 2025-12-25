"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  Terminal,
  Wifi,
  ShieldCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleFakeSubmit = async () => {
    // 1. Check if empty or invalid
    if (!email || !validateEmail(email)) {
      setStatus("error");
      // Reset error after 2 seconds so user can try again
      setTimeout(() => setStatus("idle"), 2000);
      return;
    }

    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 2200));
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      setEmail("");
    }, 4000);
  };

  return (
    <section className="min-h-screen bg-amber-400 flex items-center justify-center px-4 lg:px-10 relative overflow-hidden border-b-12 border-emerald-950">
      {/* BACKGROUND EFFECTS */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#064e3b 1.5px, transparent 1.5px)`,
          backgroundSize: "30px 30px",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="w-full h-[50vh] bg-linear-to-b from-transparent via-emerald-950 to-transparent absolute -top-[50%] left-0 animate-[scan_6s_linear_infinite]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* LEFT: TEXT */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="flex items-center gap-3">
            <Wifi
              size={20}
              className={`text-emerald-950 ${
                status === "loading" ? "animate-ping" : "animate-pulse"
              }`}
            />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-950">
              {status === "error"
                ? "UPLINK_DENIED"
                : status === "loading"
                ? "ENCRYPTING_SIGNAL"
                : "CHANNEL_01_OPEN"}
            </span>
          </div>

          <h2 className="text-4xl md:text-[9vw] font-black uppercase italic leading-[0.8] text-emerald-950 tracking-tighter">
            SECURE THE <br />
            <span
              className={`px-2 md:px-4 transition-all duration-500 ${
                status === "error"
                  ? "bg-red-600 text-white"
                  : "bg-emerald-950 text-amber-400"
              }`}
            >
              {status === "success"
                ? "INTEL_RECV"
                : status === "error"
                ? "AUTH_FAIL"
                : "INTEL_UPLINK"}
            </span>
          </h2>
        </div>

        {/* RIGHT: CARD */}
        <div className="lg:col-span-5">
          <div
            className={`bg-white border-4 p-6 md:p-10 shadow-[10px_10px_0px_0px_#064e3b] md:shadow-[15px_15px_0px_0px_#064e3b] relative group transition-all duration-300 
            ${
              status === "error"
                ? "border-red-600 animate-[shake_0.5s_ease-in-out]"
                : "border-emerald-950"
            }`}
          >
            <div className="flex justify-between items-center border-b-2 border-emerald-950/10 pb-6 mb-8">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-emerald-950" />
                <span className="text-[10px] font-black uppercase italic tracking-widest">
                  Operator_Registry
                </span>
              </div>
              {status === "error" ? (
                <AlertTriangle size={18} className="text-red-600" />
              ) : (
                <ShieldCheck
                  size={18}
                  className={
                    status === "success"
                      ? "text-emerald-500"
                      : "text-emerald-600"
                  }
                />
              )}
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-emerald-950/40 ml-1">
                  Assign_Operator_Email
                </label>
                <div className="relative">
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === "loading" || status === "success"}
                    placeholder="EMAIL_ADDRESS_REQUIRED"
                    className={`h-16 border-2 rounded-none font-black uppercase text-lg px-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-emerald-950/20 
                      ${
                        status === "error"
                          ? "border-red-600 bg-red-50"
                          : "border-emerald-950 bg-emerald-50"
                      }`}
                  />
                </div>
              </div>

              <Button
                onClick={handleFakeSubmit}
                disabled={status === "loading" || status === "success"}
                className={`w-full h-20 border-4 rounded-none font-black uppercase italic text-xl transition-all flex items-center justify-center gap-4 relative overflow-hidden active:scale-[0.98] 
                  ${
                    status === "success"
                      ? "bg-emerald-600 text-white border-emerald-700"
                      : status === "error"
                      ? "bg-red-600 text-white border-red-700"
                      : "bg-emerald-950 text-white group-hover:bg-emerald-800 border-emerald-950"
                  }`}
              >
                {status === "idle" && (
                  <>
                    <span className="relative z-10">Authorize Sync</span>
                    <ArrowRight size={20} />
                  </>
                )}
                {status === "loading" && (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    <span>Handshaking...</span>
                  </>
                )}
                {status === "success" && (
                  <>
                    <span>Uplink Established</span>
                  </>
                )}
                {status === "error" && <span>Retry Handshake</span>}
              </Button>

              <div className="pt-4 flex justify-between items-center text-[8px] font-black uppercase opacity-40 italic tracking-[0.2em]">
                <span>ENCRYPT_STND // {new Date().getFullYear()}</span>
                <span
                  className={
                    status === "error" ? "text-red-600 opacity-100" : ""
                  }
                >
                  {status === "error" ? "INVALID_CREDENTIAL" : "RECV_WAITING"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
