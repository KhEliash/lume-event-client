import JoinedEvent from "@/components/event/JoinedEvent";
import { myJoinedEventAction } from "@/services/host/event-actions";
import React from "react";

const JoinedEvents = async () => {
  const joined = await myJoinedEventAction();

  return (
    <div className="min-h-screen w-full p-4 md:p-10 space-y-8">
      <div className="border-b-4 border-emerald-950 pb-4">
        <h1 className="text-4xl font-black text-emerald-950 uppercase tracking-tighter">
          Joined Missions
        </h1>
        <p className="text-amber-600 font-bold text-xs uppercase tracking-widest mt-1">
          Your active and past event participation
        </p>
      </div>

      <JoinedEvent data={joined.result} />
    </div>
  );
};

export default JoinedEvents;
