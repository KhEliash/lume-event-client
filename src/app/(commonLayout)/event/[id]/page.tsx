import { EventDetails } from "@/components/modules/event/EventDetails";
import { eventById } from "@/services/host/event-actions";
import { getMe } from "@/services/user/userprofile";

const EventDetailsPage = async ({ params }: { params: { id: string } }) => {
  const eventId = await params;

  const { success, data: event } = await eventById(eventId.id);
const Me = await getMe()
 
  if (!success || !event) {
    return (
      <div className="max-w-4xl mx-auto p-10">
        <h1 className="text-2xl font-semibold">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="  p-6 md:p-10 ">
      <EventDetails event={event} userId = {Me.result._id} />
    </div>
  );
};

export default EventDetailsPage;
