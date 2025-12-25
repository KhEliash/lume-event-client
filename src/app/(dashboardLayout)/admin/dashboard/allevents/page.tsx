import EventsTableClient from "@/components/modules/Admin/EventsTableClient";
import { getAllEvents } from "@/services/host/event-actions";

 const AllEvents = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const currentLimit = Number(params.limit) || 10;

   const response = await getAllEvents(currentPage, currentLimit);

  const events = response?.data || [];
  const meta = response?.meta || { page: 1, limit: 10, total: 0 };

  return (
    <div className="p-4 md:p-10 py-6 min-h-screen">
      <EventsTableClient initialEvents={events} meta={meta} />
    </div>
  );
};

export default AllEvents;
