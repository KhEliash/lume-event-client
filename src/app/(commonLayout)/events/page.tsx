/* eslint-disable @typescript-eslint/no-explicit-any */

import { EventCard } from "@/components/event/EventCard";
import { getAllEvents } from "@/services/host/event-actions";

const AllEvents = async () => {
  const { success, data: events } = await getAllEvents(1, 10);
  console.log(events);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>

      {/* Error Case */}
      {!success && <p className="text-red-500">Failed to load events.</p>}

      {/* Empty State */}
      {events.length === 0 && <p className="text-gray-500">No events found.</p>}

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCard event={event} key={event._id} />
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
