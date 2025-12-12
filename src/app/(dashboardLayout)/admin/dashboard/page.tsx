/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Users, Calendar, DollarSign, Zap } from "lucide-react";

import { getAllUsers } from "@/services/admin/user-management";
import { getAllEvents } from "@/services/host/event-actions";
import { Badge } from "@/components/ui/badge";

// Define a type for a simplified Metric Card
interface MetricCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    color: string;
    description: string;
}

// Helper component for the Metric Cards (FIXED)
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  color,
  description,
}) => (
  <div
    className={`p-6 rounded-xl shadow-lg border-t-4 ${color} bg-white transition-all duration-300 hover:shadow-xl`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase">{title}</p>
        <h2 className="text-4xl font-extrabold text-gray-900 mt-1">{value}</h2>
      </div>

      <div className={`p-3 rounded-full bg-opacity-10`} style={{ backgroundColor: color.replace('border-', '').replace('-500', '').replace('-4', '00') }}>
        {/* FIX APPLIED HERE: Asserting the element accepts HTML Attributes */}
        {React.cloneElement(
          icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
          {
            className: `w-8 h-8 ${color.replace("border-", "text-")}`,
          }
        )}
      </div>
    </div>

    <p className="text-xs text-gray-400 mt-4">{description}</p>
  </div>
);

// -------------------------------
// 🔥 FIXED METRICS CALCULATION
// -------------------------------
const calculateMetrics = (usersRes: any, eventsRes: any) => {
  const usersData = usersRes?.users?.data || [];
  const totalUsers = usersRes?.users?.meta?.total || 0;
  const totalHosts = usersData.filter((u: any) => u.role === "host").length;

  // ----- FIXED EVENT STRUCTURE -----
  const eventsData = eventsRes?.data || [];
  const totalEvents = eventsRes?.meta?.total || 0;

  const openEvents = eventsData.filter((e: any) => e.status === "open").length;

  const totalParticipants = eventsData.reduce(
    (sum: number, e: any) => sum + (e.currentParticipants || 0),
    0
  );

  const eventsWithFee = eventsData.filter((e: any) => e.joiningFee > 0);

  const estimatedTotalFee = eventsWithFee.reduce(
    (sum: number, e: any) => sum + e.joiningFee * (e.currentParticipants || 0),
    0
  );

  return {
    totalUsers,
    totalHosts,
    totalEvents,
    openEvents,
    totalParticipants,
    estimatedTotalFee:
      estimatedTotalFee > 0 ? `$${estimatedTotalFee.toFixed(2)}` : "N/A",
  };
};

// -------------------------------
// MAIN ANALYTICS PAGE
// -------------------------------
const Analytics = async () => {
  const usersResponse = await getAllUsers();
  const eventsResponse = await getAllEvents();

  const metrics = calculateMetrics(
    usersResponse.success ? usersResponse : {},
    eventsResponse.success ? eventsResponse : {}
  );

  return (
    <div className="p-6 md:p-10  min-h-screen">
      {/* Header */}
      <header className="mb-10 border-b pb-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          📊 Admin Dashboard Analytics
        </h1>
        <p className="text-gray-500 mt-1">
          Overview of system activity, users, and events.
        </p>
      </header>

      {/* KEY METRIC CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <MetricCard
          title="Total Registered Users"
          value={metrics.totalUsers}
          icon={<Users />}
          color="border-indigo-500"
          description={`Including ${metrics.totalHosts} hosts.`}
        />

        <MetricCard
          title="Total Events Created"
          value={metrics.totalEvents}
          icon={<Calendar />}
          color="border-green-500"
          description={`${metrics.openEvents} events are open for booking.`}
        />

        <MetricCard
          title="Total Participants"
          value={metrics.totalParticipants}
          icon={<Zap />}
          color="border-yellow-600"
          description="All participants across all events."
        />

        <MetricCard
          title="Estimated Revenue (Fee)"
          value={metrics.estimatedTotalFee}
          icon={<DollarSign />}
          color="border-teal-500"
          description="Amount collected from joining fees."
        />
      </div>

      {/* Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            User Role Distribution
          </h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 border rounded-lg text-gray-500">
            [Chart Placeholder]
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Event Status Summary
          </h3>
          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span>Open Events</span>
              <Badge className="bg-green-500 text-white">
                {metrics.openEvents}
              </Badge>
            </li>

            <li className="flex justify-between items-center border-b pb-2">
              <span>Completed Events</span>
              <Badge variant="secondary">
                {metrics.totalEvents - metrics.openEvents}
              </Badge>
            </li>

            <li className="flex justify-between items-center">
              <span>Total Hosts</span>
              <Badge className="bg-orange-500 text-white">
                {metrics.totalHosts}
              </Badge>
            </li>
          </ul>
        </div>
      </div>

      {/* Error Handling */}
      {(!usersResponse.success || !eventsResponse.success) && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          <p className="font-semibold">⚠ Data Fetching Warning:</p>
          <p className="text-sm">
            Users: {usersResponse?.message || "Error"} | Events:{" "}
            {eventsResponse?.message || "Error"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
