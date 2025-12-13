import AllEventsClient from "@/components/event/AllEventClients";
import { getAllEvents } from "@/services/host/event-actions";

export default async function EventsPage() {
  const { success, data } = await getAllEvents(1, 10);

  return <AllEventsClient initialEvents={success ? data : []} />;
}
