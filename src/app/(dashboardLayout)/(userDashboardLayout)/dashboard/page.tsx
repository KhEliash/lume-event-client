 

import UserAnalyticsClient from "@/components/modules/User/UserAnalyticsClient";
import { myJoinedEventAction } from "@/services/host/event-actions";
import { getMe } from "@/services/user/userprofile";

const UserAnalytics = async () => {
  const meRes = await getMe();
  const joinedEventsRes = await myJoinedEventAction();

  return (
    <UserAnalyticsClient
      user={meRes?.result || {}}
      joinedEvents={joinedEventsRes?.result || []}
    />
  );
};

export default UserAnalytics;
