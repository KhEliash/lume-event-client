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
  Activity,
  AlertTriangle,
  ZapIcon,
} from "lucide-react";
import Image from "next/image";
import { DeleteEventButton } from "./DeleteEventButton";

const getStatusBadgeClasses = (status: string): string => {
  const base =
    "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold shadow-md";
  switch (status.toLowerCase()) {
    case "open":
      return `${base} bg-green-600 text-white`;
    case "full":
      return `${base} bg-yellow-500 text-black`;
    case "cancelled":
      return `${base} bg-red-600 text-white`;
    case "closed":
      return `${base} bg-gray-500 text-white`;
    default:
      return `${base} bg-blue-600 text-white`;
  }
};

const formatCurrency = (amount: number): string => {
  return amount === 0 ? "Free" : `$${amount}`;
};

interface Location {
  address: string;
  city: string;
}

interface EventData {
  _id: string;
  name: string;
  description: string;
  eventImage?: string;
  date: string;
  time: string;
  status: string;
  type: string;
  joiningFee: number;
  currentParticipants: number;
  maxParticipants: number;
  location: Location;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

// interface HostedEventsResult {
//   success: boolean;
//   message: string;
//   events: {
//     data: EventData[];
//   };
// }

const MyHostedEvents = async () => {
  const result = (await myHostedEvents()) ;

  const { success, message, events } = result;
  const eventList = events?.data || [];
  // console.log(eventList);

  if (!success) {
    return (
      <div className="text-center text-red-700 bg-red-50 border border-red-300 font-semibold p-6 rounded-lg shadow-inner">
        <AlertTriangle className="w-6 h-6 inline mr-2" />
        Error Fetching Events: {message}
      </div>
    );
  }

  if (eventList.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium p-8 border-dashed border-2 border-gray-300 rounded-lg bg-gray-50">
        <h1 className="text-2xl mb-2">No Hosted Events Found</h1>
        You have not hosted any events yet.{" "}
        <Link href="/host/dashboard/create-event" className="text-blue-600 hover:underline">
          Create one now!
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-2 flex items-center">
        <Activity className="w-6 h-6 text-blue-600 mr-2" />
        My Hosted Events
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {eventList.map((event: EventData) => (
          <div
            key={event._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:border-blue-300"
          >
             <div className="relative h-48 w-full bg-gray-100 flex items-center justify-center">
               {event.eventImage ? (
                <Image
                  src={event.eventImage}
                  alt={event.name}
                  fill={true}  
                  className="object-cover"  
                  sizes="(max-width: 768px) 100vw, 33vw"  
                />
              ) : (
                <ZapIcon className="w-12 h-12 text-gray-400" />
              )}

              {/* Status Badge */}
              <span className={getStatusBadgeClasses(event.status)}>
                {event.status.toUpperCase()}
              </span>

              {/* Type Tag */}
              <span className="absolute bottom-3 left-3 bg-black/70 text-white px-2.5 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                <Tag className="inline w-3 h-3 mr-1" />
                {event.type.toUpperCase().replace(/_/g, " ")}
              </span>
            </div>

            {/* Card Content */}
            <div className="p-5 flex flex-col grow space-y-4">
              {/* Title */}
              <h3
                className="text-2xl font-extrabold text-gray-900 line-clamp-2"
                title={event.name}
              >
                {event.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm line-clamp-3">
                {event.description}
              </p>

              {/* Details Grid */}
              <div className="space-y-2 text-sm text-gray-700 pt-3 border-t border-gray-100">
                {/* Date & Time */}
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-500 shrink-0" />
                  <span className="font-medium">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <Clock className="w-4 h-4 ml-4 mr-2 text-indigo-500 shrink-0" />
                  <span className="font-medium">{event.time}</span>
                </div>

                {/* Location */}
                <div
                  className="flex items-center"
                  title={`${event.location?.address}, ${event.location?.city}`}
                >
                  <MapPin className="w-4 h-4 mr-2 text-red-500 shrink-0" />
                  <span className="truncate">
                    {event.location?.city}, {event.location?.address}
                  </span>
                </div>

                {/* Participants & Fee */}
                <div className="flex justify-between pt-2">
                  <div className="flex items-center text-gray-700">
                    <Users className="w-4 h-4 mr-2 text-green-600 shrink-0" />
                    <span className="font-semibold">
                      {event.currentParticipants}/{event.maxParticipants}{" "}
                      Participants
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="w-4 h-4 mr-2 text-purple-600 shrink-0" />
                    <span className="font-bold text-blue-700">
                      {formatCurrency(event.joiningFee)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between gap-3 pt-5 border-t border-gray-100 mt-auto">
                <Link
                  href={`/host/dashboard/event/${event._id}`}
                  className="flex-1 flex items-center justify-center text-sm px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  <Eye className="w-4 h-4 mr-1" /> View
                </Link>

                <Link
                  href={`/host/dashboard/event/update/${event._id}`}
                  className="flex-1 flex items-center justify-center text-sm px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  <Edit className="w-4 h-4 mr-1" /> Edit
                </Link>

                {/* <button
                  className="flex-1 flex items-center justify-center text-sm px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium"
                  // Add a client component wrapper or handler for deletion here
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </button> */}
                <DeleteEventButton eventId={event._id}/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHostedEvents;
