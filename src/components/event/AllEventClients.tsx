/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { EventCard } from "@/components/event/EventCard";
import {
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const AllEventsClient = ({ initialEvents }: { initialEvents: any[] }) => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, price-low, price-high
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // Extract unique categories from data
  const categories = useMemo(() => {
    const types = initialEvents.map((e) => e.type);
    return ["all", ...Array.from(new Set(types))];
  }, [initialEvents]);

  // Combined Filter, Search, and Sort Logic
  const processedEvents = useMemo(() => {
    let result = [...initialEvents];

    // 1. Search Filter (Name, City, or Type)
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter((e) =>
        [e?.name, e?.location?.city, e?.type].some(
          (val) => val && String(val).toLowerCase().includes(lower)
        )
      );
    }

    // 2. Category Tab Filter
    if (activeCategory !== "all") {
      result = result.filter((e) => e.type === activeCategory);
    }

    // 3. Sorting Logic
    result.sort((a, b) => {
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (sortBy === "price-low")
        return (a.joiningFee || 0) - (b.joiningFee || 0);
      if (sortBy === "price-high")
        return (b.joiningFee || 0) - (a.joiningFee || 0);
      return 0;
    });

    return result;
  }, [search, activeCategory, sortBy, initialEvents]);

  // Pagination Logic
  const totalPages = Math.ceil(processedEvents.length / itemsPerPage);
  const currentEvents = processedEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className=" mx-auto px-4  lg:px-10 py-16 md:py-24 space-y-10">
      {/* --- Header Section --- */}
      <div className="space-y-6">
        <h1 className="text-6xl md:text-8xl font-black text-emerald-950 uppercase tracking-tighter leading-none">
          The <span className="text-amber-500 italic">Feed.</span>
        </h1>

        {/* --- Search & Sort Controls --- */}
        <div className="flex flex-col lg:flex-row gap-4 items-stretch">
          <div className="relative grow">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/30"
              size={20}
            />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-12 pr-4 py-4 border-2 border-emerald-950 bg-white font-bold focus:ring-4 focus:ring-amber-400 outline-none uppercase text-xs tracking-widest"
              placeholder="Search by name or city..."
            />
          </div>

          <div className="flex gap-4">
            <div className="relative grow lg:w-48">
              <ArrowUpDown
                className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-950/30 pointer-events-none"
                size={18}
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-8 py-4 border-2 border-emerald-950 bg-white font-black uppercase text-[10px] tracking-widest appearance-none cursor-pointer focus:ring-4 focus:ring-amber-400 outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* --- Category Tabs --- */}
        <div className="flex flex-wrap gap-2 border-b-2 border-emerald-950/10 pb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentPage(1);
              }}
              className={cn(
                "px-6 py-2 text-[10px] font-black uppercase tracking-[0.2em] border-2 transition-all",
                activeCategory === cat
                  ? "bg-emerald-950 text-amber-400 border-emerald-950 translate-x-1 -translate-y-1 shadow-[-4px_4px_0px_0px_rgba(251,191,36,1)]"
                  : "bg-white text-emerald-950 border-emerald-950/10 hover:border-emerald-950"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* --- Results Count --- */}
      <div className="flex items-center gap-4">
        <SlidersHorizontal size={16} className="text-amber-500" />
        <span className="text-xs font-black uppercase tracking-widest text-emerald-950/40">
          Found {processedEvents.length} signals in {activeCategory}
        </span>
      </div>

      {/* --- Grid --- */}
      {currentEvents.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border-4 border-dashed border-emerald-950/5">
          <p className="text-emerald-950/20 font-black uppercase tracking-[0.5em]">
            No Data Found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
          {currentEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* --- Pagination --- */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="p-4 border-2 border-emerald-950 hover:bg-amber-400 disabled:opacity-10 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-12 h-12 border-2 border-emerald-950 font-black text-xs transition-all",
                  currentPage === i + 1
                    ? "bg-emerald-950 text-white shadow-[4px_4px_0px_0px_rgba(251,191,36,1)]"
                    : "bg-white"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="p-4 border-2 border-emerald-950 hover:bg-amber-400 disabled:opacity-10 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllEventsClient;
