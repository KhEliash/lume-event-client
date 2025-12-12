import JoinedEvent from '@/components/event/JoinedEvent';
import { myJoinedEventAction } from '@/services/host/event-actions';
import React from 'react';

const JoinedEvents =async () => {
    const joined = await myJoinedEventAction()
    // console.log(joined);
    return (
        <div className="  min-h-svh w-full  p-6 md:p-10">
              <h1 className="text-2xl text-center font-bold mb-6">My profile</h1>
              <JoinedEvent data={joined.result} />
            </div>
    );
};

export default JoinedEvents;