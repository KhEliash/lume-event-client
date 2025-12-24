import { EventDetails } from "@/components/modules/event/EventDetails";
import { getBookingForEvent } from "@/services/booking/booking-actions";
import { eventById } from "@/services/host/event-actions";
import { getMe } from "@/services/user/userprofile";

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const [eventData, userData] = await Promise.all([
    eventById(id),
    getMe().catch(() => null),
  ]);

  const { success, data: event } = eventData;

  if (!success || !event) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl font-bold uppercase text-red-600">
          Event not found
        </h1>
      </div>
    );
  }

  const userId = userData?.result?._id || null;

  let bookings = null;
  if (userId) {
    const bookingRes = await getBookingForEvent(event._id);
    bookings = bookingRes?.result || null;
  }

  return (
    <div className="p-0">
      <EventDetails event={event} userId={userId} booking={bookings} />
    </div>
  );
};

export default EventDetailsPage;
