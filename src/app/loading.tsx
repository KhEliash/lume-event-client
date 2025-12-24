import { CalendarDays } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-100 overflow-hidden bg-emerald-50">
        <div className="h-full bg-amber-400 w-full origin-left animate-[pulse_1.5s_infinite_ease-in-out]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-4">
          <div className="h-4 w-24 bg-emerald-950/10 animate-pulse" />
          <div className="h-12 w-64 bg-emerald-950/5 animate-pulse rounded-br-2xl rounded-tl-2xl" />
        </div>

        {/* Hero-style Skeleton */}
        <div className="w-full h-[400px] bg-emerald-950/5 border-2 border-emerald-900/5 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 opacity-20">
            <CalendarDays className="w-12 h-12 text-emerald-950 animate-bounce" />
            <span className="font-black uppercase tracking-[0.4em] text-xs text-emerald-950">
              Lume
            </span>
          </div>
        </div>

        {/* Grid Skeleton (Simulating Event Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-4">
              {/* Image box */}
              <div className="aspect-video bg-emerald-950/5 border-b-4 border-emerald-900/10" />
              {/* Text lines */}
              <div className="h-4 w-full bg-emerald-950/10 animate-pulse" />
              <div className="h-4 w-2/3 bg-emerald-950/5 animate-pulse" />
              {/* Button skeleton */}
              <div className="h-10 w-32 bg-emerald-900/5 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
