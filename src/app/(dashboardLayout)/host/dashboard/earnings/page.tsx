import HostEarningsClient from "@/components/modules/Host/HostEarningsPage";
import { myHostedEvents } from "@/services/host/event-actions";

const HostEarningsPage = async () => {
  const result = await myHostedEvents();

  const eventList = result?.events?.data || [];

  return <HostEarningsClient eventList={eventList} />;
};

export default HostEarningsPage;
