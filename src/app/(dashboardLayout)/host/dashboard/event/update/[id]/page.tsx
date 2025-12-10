import { UpdateEventForm } from "@/components/modules/Host/UpdateEventForm";
import { eventById } from "@/services/host/event-actions";
 
const EventUpdate = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const event = await eventById(id);

  return (
    <div className="  min-h-svh w-full  p-6 md:p-10">
      <h1 className="text-2xl text-center font-bold mb-6">Create Event</h1>
      <UpdateEventForm event={event.result} />
    </div>
  );
};

export default EventUpdate;
