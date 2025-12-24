import React from "react";
import Link from "next/link";
import { CalendarDays, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-emerald-950 text-white pt-16 pb-8 border-t-4 border-amber-400">
      <div className="container mx-auto px-2 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="bg-amber-400 p-2 rounded-br-xl rounded-tl-xl transition-transform group-hover:rotate-12">
                <CalendarDays className="text-emerald-950 w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">
                Lume<span className="text-amber-500">.</span>
              </span>
            </Link>
            <p className="text-emerald-100/60 max-w-sm text-sm font-medium leading-relaxed">
              Premium event management for those who demand excellence. From
              concept to execution, we craft experiences that linger.
            </p>
          </div>

          {/* Minimal Links */}
          <div className="space-y-4">
            <h4 className="text-amber-400 text-xs font-black uppercase tracking-[0.2em]">
              Quick Access
            </h4>
            <nav className="flex flex-col gap-3">
              {["Events", "About", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  className="text-sm font-bold text-emerald-50/80 hover:text-amber-400 transition-colors flex items-center gap-1 group"
                >
                  {item}
                  <ArrowUpRight
                    size={14}
                    className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1"
                  />
                </Link>
              ))}
            </nav>
          </div>

          {/* Action Section */}
          <div className="space-y-4">
            <h4 className="text-amber-400 text-xs font-black uppercase tracking-[0.2em]">
              Support
            </h4>
            <Link
              href="mailto:eliashebrahim@gmail.com"
              className="inline-flex items-center gap-2 bg-emerald-900 px-4 py-3 border-l-4 border-amber-400 hover:bg-emerald-800 transition-colors"
            >
              <Mail size={16} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Contact Support
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-100/40">
            &copy; {currentYear} Lume International. All Rights Reserved.
          </p>

          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="text-[10px] font-bold uppercase tracking-widest text-emerald-100/40 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-[10px] font-bold uppercase tracking-widest text-emerald-100/40 hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
