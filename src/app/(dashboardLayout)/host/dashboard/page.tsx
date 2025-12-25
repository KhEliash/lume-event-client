import HostAnalyticsClient from "@/components/modules/Host/HostAnalyticsClient";
import { myHostedEvents } from "@/services/host/event-actions";
import { getMe } from "@/services/user/userprofile";

const HostAnalyticsPage = async () => {
  const meRes = await getMe();
  const eventRes = await myHostedEvents();

  return (
    <HostAnalyticsClient
      host={meRes?.result || {}}
      events={eventRes?.events?.data || []}
    />
  );
};

export default HostAnalyticsPage;
