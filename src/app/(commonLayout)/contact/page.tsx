"use client";

import React, { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Loader,
  Send,
  CheckCircle,
  XCircle,
  CalendarDays,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status !== "idle") setStatus("idle");
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    setTimeout(() => {
      setLoading(false);
      const isSuccess = Math.random() > 0.2;
      if (isSuccess) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    }, 2000);
  };

  return (
    <main className="bg-white py-16 md:py-24 min-h-screen">
      <div className="  mx-auto px-4 lg:px-10">
        <div className="text-left mb-16 border-l-8 border-amber-400 pl-8">
          <h1 className="text-5xl md:text-7xl font-black text-emerald-950 uppercase tracking-tighter mb-4">
            Get In <span className="text-amber-500">Touch.</span>
          </h1>
          <p className="text-xl font-bold text-emerald-900/40 uppercase tracking-widest max-w-2xl">
            Whether you are hosting a gala or attending a workshop, our team is
            standing by to ensure excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-0 bg-emerald-950 text-white rounded-none shadow-[15px_15px_0px_0px_rgba(251,191,36,1)]">
            <div className="p-8 border-b border-emerald-900">
              <div className="bg-amber-400 w-12 h-12 flex items-center justify-center rounded-br-2xl rounded-tl-2xl mb-6">
                <CalendarDays className="text-emerald-950 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
                Office Headquarters
              </h2>
              <p className="text-emerald-100/60 text-sm font-medium">
                Global Operations Center
              </p>
            </div>

            <div className="p-8 space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-emerald-900 group-hover:bg-amber-400 transition-colors">
                  <Mail className="w-5 h-5 text-amber-400 group-hover:text-emerald-950" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Email Support
                  </p>
                  <p className="text-lg font-bold">concierge@lume.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-emerald-900 group-hover:bg-amber-400 transition-colors">
                  <Phone className="w-5 h-5 text-amber-400 group-hover:text-emerald-950" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Phone
                  </p>
                  <p className="text-lg font-bold">+1 (555) 000-8888</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="p-2 bg-emerald-900 group-hover:bg-amber-400 transition-colors">
                  <MapPin className="w-5 h-5 text-amber-400 group-hover:text-emerald-950" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">
                    Location
                  </p>
                  <p className="text-sm font-bold leading-relaxed">
                    123 Lume Avenue, <br />
                    Luxury District, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-10 rounded-none border-2 border-emerald-950 shadow-[15px_15px_0px_0px_rgba(6,78,59,0.1)]"
            >
              <h3 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter mb-8">
                Send an Inquiry
              </h3>

              {status === "success" && (
                <div className="flex items-center p-4 mb-6 text-emerald-950 bg-amber-400 font-bold uppercase text-xs tracking-widest animate-in fade-in slide-in-from-top-2">
                  <CheckCircle className="w-5 h-5 mr-3" />
                  Inquiry Transmitted Successfully
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center p-4 mb-6 text-white bg-red-600 font-bold uppercase text-xs tracking-widest">
                  <XCircle className="w-5 h-5 mr-3" />
                  Transmission Failed. Try Again.
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-950/10 focus:border-emerald-950 outline-none transition-colors bg-emerald-50/30 font-bold"
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-emerald-950/10 focus:border-emerald-950 outline-none transition-colors bg-emerald-50/30 font-bold"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <label
                  htmlFor="message"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-950"
                >
                  Detailed Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-emerald-950/10 focus:border-emerald-950 outline-none transition-colors bg-emerald-50/30 font-bold resize-none"
                  disabled={loading}
                ></textarea>
              </div>

              <button
                type="submit"
                className={cn(
                  "w-full mt-10 py-5 px-8 font-black uppercase tracking-[0.3em] text-sm transition-all relative overflow-hidden",
                  loading
                    ? "bg-emerald-900 text-emerald-400 cursor-not-allowed"
                    : "bg-emerald-950 text-white hover:bg-emerald-900 shadow-[6px_6px_0px_0px_rgba(251,191,36,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                )}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader className="w-5 h-5 mr-3 animate-spin" />{" "}
                    Transmitting...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    Send Inquiry <Send className="w-4 h-4 ml-4" />
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
