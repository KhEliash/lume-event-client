import { CreateEventForm } from "@/components/modules/Host/CreateEventForm";
import React from "react";

const HostCreatePage = () => {
  return (
    <div className="  min-h-svh w-full  p-6 md:p-10">
      <h1 className="text-2xl text-center font-bold mb-6">Create Event</h1>
      <CreateEventForm />
    </div>
  );
};

export default HostCreatePage;
