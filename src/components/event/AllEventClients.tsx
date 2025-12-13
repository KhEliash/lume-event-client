"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { EventCard } from "@/components/event/EventCard";

const AllEventsClient = ({ initialEvents }: { initialEvents: any[] }) => {
  const [events] = useState(initialEvents);
  const [filteredEvents, setFilteredEvents] = useState(initialEvents);
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    const lower = value.toLowerCase();

    setFilteredEvents(
      events.filter((e) =>
        [e?.name, e?.location, e?.category].some(
          (f) => f && String(f).toLowerCase().includes(lower)
        )
      )
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">All Events</h1>

      <div className="flex">
        <button className="bg-black text-white px-4 py-2 rounded-l-lg">
          Search
        </button>
        <input
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border rounded-r-lg"
          placeholder="Search events..."
        />
      </div>

      {filteredEvents.length === 0 && (
        <p className="text-gray-500">No events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default AllEventsClient;
