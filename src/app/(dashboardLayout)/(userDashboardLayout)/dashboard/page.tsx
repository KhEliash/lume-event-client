"use client";

import React from "react";
import { Clock, Calendar, Zap, DollarSign, TrendingUp } from "lucide-react";

// --- 1. Metric Card Component Props ---
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

// --- 2. Metric Card Component (FIXED) ---
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
}) => (
  <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 transition duration-300 hover:shadow-lg">
    <div className="flex items-center space-x-4">
      {/* Dynamic Icon/Color */}
      <div className={`p-3 rounded-full ${color}`}>
        {/* FIX: Explicitly assert the type of the cloned element to include HTML attributes 
                       like 'className'.
                */}
        {React.cloneElement(
          icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
          {
            className: `w-6 h-6 text-white`,
          }
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>
      </div>
    </div>
  </div>
);

// --- 3. Fake Data Generation ---
const generateFakeData = () => {
  return {
    // Metric Data
    totalEventsJoined: 18,
    upcomingEvents: 3,
    totalHoursSpent: 45.5,
    lifetimeSavings: 120, // Mock savings based on free events or discounts

    // Detailed Activity Data (for the table)
    recentActivity: [
      {
        id: 1,
        event: "Tech Meetup: Next.js",
        date: "2025-12-10",
        type: "Conference",
        status: "Completed",
      },
      {
        id: 2,
        event: "Local Hike - Eagle Peak",
        date: "2025-12-24",
        type: "Outdoor",
        status: "Upcoming",
      },
      {
        id: 3,
        event: "Art Workshop: Sketching",
        date: "2025-11-28",
        type: "Art",
        status: "Completed",
      },
      {
        id: 4,
        event: "Holiday Cooking Class",
        date: "2025-12-18",
        type: "Hobby",
        status: "Upcoming",
      },
    ],

    // Progress Data
    progressTitle: "Participation Goal",
    progressValue: 75,
    progressDescription: "75% complete for this month's goal (4/5 events).",
  };
};

// --- 4. Main Component ---
const UserDashboardAnalytics = () => {
  const data = generateFakeData();

  return (
    <div className="p-6 md:p-8  min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">👋 Welcome Back,</h1>
        <p className="text-gray-500">
          Your engagement overview for the last 30 days.
        </p>
      </header>

      {/* A. Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <MetricCard
          title="Events Joined"
          value={data.totalEventsJoined.toString()}
          icon={<Zap />}
          color="bg-indigo-600"
        />
        <MetricCard
          title="Upcoming Events"
          value={data.upcomingEvents.toString()}
          icon={<Calendar />}
          color="bg-green-600"
        />
        <MetricCard
          title="Total Hours Spent"
          value={`${data.totalHoursSpent} hrs`}
          icon={<Clock />}
          color="bg-yellow-600"
        />
        <MetricCard
          title="Lifetime Savings"
          value={`$${data.lifetimeSavings}`}
          icon={<DollarSign />}
          color="bg-teal-600"
        />
      </div>

      {/* B. Detailed Sections (Charts and Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Progress / Goal Tracker */}
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> Monthly
            Progress
          </h3>

          <div className="flex flex-col items-center py-4">
            <div className="relative w-32 h-32">
              {/* Simple Circular Progress Bar (CSS) */}
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200 stroke-current"
                  strokeWidth="10"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                ></circle>
                <circle
                  className="text-indigo-500 stroke-current transition-all duration-700 ease-out"
                  strokeWidth="10"
                  strokeLinecap="round"
                  cx="50"
                  cy="50"
                  r="45"
                  fill="transparent"
                  strokeDasharray={283} // 2 * pi * 45 ≈ 282.7
                  strokeDashoffset={283 - (283 * data.progressValue) / 100}
                  style={{
                    transform: "rotate(-90deg)",
                    transformOrigin: "50% 50%",
                  }}
                ></circle>
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dy=".3em"
                  className="text-3xl font-bold text-indigo-600"
                >
                  {data.progressValue}%
                </text>
              </svg>
            </div>
            <p className="mt-4 text-center text-gray-700 font-medium">
              {data.progressTitle}
            </p>
            <p className="text-sm text-gray-500">{data.progressDescription}</p>
          </div>
        </div>

        {/* 2. Recent Activity Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-green-500" /> Recent Activity
          </h3>

          <table className=" w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.recentActivity.map((activity) => (
                <tr key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {activity.event}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {activity.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardAnalytics;
