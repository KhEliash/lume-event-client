 
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { EventCard } from "@/components/event/EventCard";
import { getAllEvents } from "@/services/host/event-actions";
 
const AllEvents = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const { success, data } = await getAllEvents(1, 50);
      if (!success) {
        setError("Failed to load events.");
        return;
      }

      setEvents(data);
      setFilteredEvents(data);
    };

    fetchEvents();
  }, []);

  const handleSearch = (value: string) => {
    setSearch(value);

    const lower = value.toLowerCase();

    const results = events.filter((e) => {
      const fields = [e?.name, e?.location, e?.category];

      return fields.some((field) => {
        if (!field) return false;
        return String(field).toLowerCase().includes(lower);
      });
    });

    setFilteredEvents(results);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>

      {/* Search Bar */}
      <div className="flex items-center justify-center ">
        <button className="border-r-0 rounded-r-0 bg-black text-white text-md p-2 rounded-l-lg shadow-sm">Search</button>
        <input
          type="text"
          placeholder="Search events by name, location, or category..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-4 py-2 border-l-0 border rounded-r-lg shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {filteredEvents.length === 0 && !error && (
        <p className="text-gray-500">No events found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredEvents.map((event: any) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
