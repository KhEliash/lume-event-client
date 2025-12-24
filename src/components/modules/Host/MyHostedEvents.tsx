/* eslint-disable @typescript-eslint/no-explicit-any */
import { myHostedEvents } from "@/services/host/event-actions";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Edit,
  Eye,
  Tag,
  AlertTriangle,
  ZapIcon,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { DeleteEventButton } from "./DeleteEventButton";

const getStatusBadgeClasses = (status: string): string => {
  const base =
    "absolute -top-1 -right-1 px-4 py-1 rounded-none text-[10px] font-black uppercase tracking-tighter border-2 border-emerald-950 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] z-10";
  switch (status.toLowerCase()) {
    case "open":
      return `${base} bg-emerald-400 text-emerald-950`;
    case "full":
      return `${base} bg-amber-400 text-emerald-950`;
    case "cancelled":
      return `${base} bg-red-400 text-white`;
    case "closed":
      return `${base} bg-slate-400 text-white`;
    default:
      return `${base} bg-blue-400 text-white`;
  }
};

const MyHostedEvents = async () => {
  const result = await myHostedEvents();
  const { success, message, events } = result;
  const eventList = events?.data || [];

  if (!success) {
    return (
      <div className="border-4 border-emerald-950 bg-red-50 p-8 shadow-[8px_8px_0px_0px_rgba(220,38,38,1)] flex items-center gap-4">
        <AlertTriangle className="w-10 h-10 text-red-600" />
        <div>
          <h2 className="font-black uppercase text-red-600">System Error</h2>
          <p className="font-bold text-sm text-red-900">{message}</p>
        </div>
      </div>
    );
  }

  if (eventList.length === 0) {
    return (
      <div className="border-4 border-dashed border-emerald-950 p-12 text-center bg-white shadow-[8px_8px_0px_0px_rgba(6,78,59,1)]">
        <h2 className="text-2xl font-black uppercase text-emerald-950 mb-4 font-mono italic">
          No Intel Found
        </h2>
        <Link
          href="/host/dashboard/create-event"
          className="inline-flex items-center gap-2 bg-amber-400 px-6 py-3 border-2 border-emerald-950 font-black uppercase text-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[4px_4px_0px_0px_rgba(6,78,59,1)]"
        >
          <Plus size={18} /> Launch First Event
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {eventList.map((event: any) => (
        <div
          key={event._id}
          className="group relative bg-white border-4 border-emerald-950 shadow-[8px_8px_0px_0px_rgba(6,78,59,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(251,191,36,1)] hover:-translate-x-1 hover:-translate-y-1 flex flex-col"
        >
          {/* Status & Image Header */}
          <div className="relative h-56 w-full border-b-4 border-emerald-950 bg-emerald-50 overflow-hidden">
            <span className={getStatusBadgeClasses(event.status)}>
              {event.status}
            </span>

            {event.eventImage ? (
              <Image
                src={event.eventImage}
                alt={event.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 opacity-20">
                <ZapIcon size={48} className="text-emerald-950" />
                <span className="font-black text-xs uppercase italic">
                  No Visual Data
                </span>
              </div>
            )}

            <div className="absolute bottom-0 left-0 bg-emerald-950 text-amber-400 px-4 py-1 font-black text-[10px] uppercase tracking-widest border-t-2 border-r-2 border-emerald-950">
              <Tag className="inline w-3 h-3 mr-1" />
              {event.type.replace(/_/g, " ")}
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 flex flex-col grow">
            <h3 className="text-xl font-black uppercase leading-tight text-emerald-950 mb-3 italic line-clamp-2">
              {event.name}
            </h3>

            <p className="text-emerald-900 font-medium text-xs leading-relaxed mb-6 line-clamp-2 italic opacity-80">
              {event.description}
            </p>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-px bg-emerald-950 border-2 border-emerald-950 mb-6">
              <div className="bg-white p-3 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase text-emerald-950 truncate">
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="bg-white p-3 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase text-emerald-950">
                  {event.time}
                </span>
              </div>
              <div className="bg-white p-3 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase text-emerald-950">
                  {event.currentParticipants}/{event.maxParticipants}
                </span>
              </div>
              <div className="bg-white p-3 flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase text-emerald-950">
                  {event.joiningFee === 0 ? "FREE" : `$${event.joiningFee}`}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-8">
              <MapPin className="w-4 h-4 text-emerald-950 shrink-0 mt-0.5" />
              <span className="text-[10px] font-bold uppercase text-emerald-800 leading-tight">
                {event.location?.city} <br />
                <span className="opacity-60">{event.location?.address}</span>
              </span>
            </div>

            {/* Action Bar */}
            <div className="mt-auto grid grid-cols-3 gap-2">
              <Link
                href={`/host/dashboard/event/${event._id}`}
                className="flex flex-col items-center justify-center p-2 border-2 border-emerald-950 bg-white hover:bg-emerald-50 transition-colors group/btn shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <Eye size={16} />
                <span className="text-[8px] font-black uppercase mt-1">
                  View
                </span>
              </Link>

              <Link
                href={`/host/dashboard/event/update/${event._id}`}
                className="flex flex-col items-center justify-center p-2 border-2 border-emerald-950 bg-white hover:bg-amber-50 transition-colors shadow-[2px_2px_0px_0px_rgba(6,78,59,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
              >
                <Edit size={16} />
                <span className="text-[8px] font-black uppercase mt-1 text-emerald-950">
                  Edit
                </span>
              </Link>

              <DeleteEventButton eventId={event._id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyHostedEvents;
