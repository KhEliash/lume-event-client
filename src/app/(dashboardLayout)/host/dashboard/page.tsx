"use client";

import React from "react";
import { Award, Calendar, DollarSign, Users, Star, Zap } from "lucide-react";

// --- 1. Metric Card Component (Layout Refinement & Type-Fixed) ---
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
    <div className="flex items-center space-x-4">
      {/* Dynamic Icon/Color */}
      <div className={`p-3 rounded-full ${color} shrink-0`}>
        {/* Ensure icon does not collapse and apply type fix */}
        {React.cloneElement(
          icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
          {
            className: "w-6 h-6 text-white",
          }
        )}
      </div>
      <div className="min-w-0">
        {" "}
        {/* Use min-w-0 to prevent overflow */}
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      </div>
    </div>
  </div>
);

// --- 2. Fake Data Generation ---
const generateFakeHostData = () => {
  return {
    hostName: "Host Elias",
    totalEventsHosted: 12,
    totalParticipants: 145,
    averageRating: 4.8,
    totalEarnings: 875.5,

    upcomingEvents: [
      {
        id: 101,
        name: "Sunset Photography Workshop",
        date: "2025-12-20",
        participants: 15,
        fee: 25,
      },
      {
        id: 102,
        name: "Downtown Food Tour",
        date: "2026-01-05",
        participants: 22,
        fee: 40,
      },
      {
        id: 103,
        name: "Historical Walking Tour",
        date: "2026-01-15",
        participants: 18,
        fee: 10,
      },
    ],

    recentRatings: [
      {
        id: 1,
        event: "Tech Talk: AI Basics",
        rating: 5,
        comment: "Excellent presentation, very engaging!",
      },
      {
        id: 2,
        event: "City Bike Tour",
        rating: 4,
        comment: "Fun route, but started a little late.",
      },
      {
        id: 3,
        event: "Craft Beer Tasting",
        rating: 5,
        comment: "Great selections and knowledgeable host.",
      },
    ],
  };
};

// --- 3. Main Host Component (Layout Reorganized) ---
const HostAnalytics = () => {
  const data = generateFakeHostData();

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <header className="mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">✨ Host Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Hello, **{data.hostName}**! Here is your performance overview.
        </p>
      </header>

      {/* A. Key Metrics (Responsive 4-column grid) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Events Hosted"
          value={data.totalEventsHosted.toString()}
          icon={<Calendar />}
          color="bg-indigo-600"
        />
        <MetricCard
          title="Total Participants"
          value={data.totalParticipants.toString()}
          icon={<Users />}
          color="bg-green-600"
        />
        <MetricCard
          title="Average Rating"
          value={`${data.averageRating.toFixed(1)} / 5`}
          icon={<Star />}
          color="bg-yellow-600"
        />
        <MetricCard
          title="Total Earnings"
          value={`$${data.totalEarnings.toFixed(2)}`}
          icon={<DollarSign />}
          color="bg-teal-600"
        />
      </section>

      {/* B. Detailed Sections: Upcoming Events & Ratings */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* 1. Upcoming Events Table */}
        <div className="bg-white p-6 rounded-xl shadow-md border overflow-x-auto">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-indigo-500" /> Upcoming Events (
            {data.upcomingEvents.length})
          </h3>

          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booked
                </th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.upcomingEvents.map((event) => (
                <tr key={event.id}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {event.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.date}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-right font-bold text-indigo-600">
                    {event.participants}
                  </td>
                  {/* <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <a href={`/host/events/${event.id}/details`} className="text-indigo-600 hover:text-indigo-900 flex items-center justify-end">
                                            Manage <ChevronRight className="w-4 h-4 ml-1" />
                                        </a>
                                    </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 2. Recent Ratings/Feedback */}
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" /> Recent Ratings
          </h3>
          <div className="space-y-4">
            {data.recentRatings.map((rating) => (
              <div key={rating.id} className="p-3 border-b last:border-b-0">
                <div className="flex justify-between items-start mb-1">
                  <p className="text-sm font-medium text-gray-700">
                    {rating.event}
                  </p>
                  <div className="flex items-center text-yellow-500">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="font-bold">{rating.rating}.0</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic leading-snug">
                  &quot;{rating.comment}&quot;
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            {/* <a href="/host/ratings" className="text-sm text-indigo-600 hover:text-indigo-900 font-medium flex items-center justify-end">
                            View All Feedback <ChevronRight className="w-4 h-4 ml-1" />
                        </a> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HostAnalytics;
