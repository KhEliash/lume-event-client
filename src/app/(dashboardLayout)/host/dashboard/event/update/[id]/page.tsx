import { UpdateEventForm } from "@/components/modules/Host/UpdateEventForm";
import { eventById } from "@/services/host/event-actions";
import { AlertTriangle, Terminal } from "lucide-react";

const EventUpdate = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const event = await eventById(id);

  if (!event || !event.data) {
    return (
      <div className="min-h-svh flex items-center justify-center p-6 bg-[#fafafa]">
        <div className="border-4 border-emerald-950 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex items-center gap-4">
          <AlertTriangle className="text-red-600 h-8 w-8" />
          <h2 className="text-xl font-black uppercase italic text-red-600">
            Error: Record Not Found
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh w-full p-4 md:px-10 py-6">
      <div className=" space-y-10">
        {/* Header Intel Block */}
        <div className="relative border-l-8 border-amber-400 pl-6 py-2">
          <div className="flex items-center gap-2 text-emerald-900/40 mb-1">
            <Terminal size={14} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">
              System // Update // ID: {id.slice(-8)}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-emerald-950 leading-none">
            Update{" "}
            <span className="text-emerald-800/20 underline decoration-amber-400 underline-offset-8">
              Event
            </span>
          </h1>
          <p className="mt-4 text-sm font-bold text-emerald-900/60 uppercase italic tracking-wide">
            Modify the operational parameters for: {event.data.name}
          </p>
        </div>

        {/* The Form Container */}
        <div className="relative">
          {/* Decorative background element for that brutalist depth */}
          <div className="" />

          <UpdateEventForm event={event.data} />
        </div>
      </div>
    </div>
  );
};

export default EventUpdate;
