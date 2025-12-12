/* eslint-disable @typescript-eslint/no-explicit-any */
 import { getMyPayments } from "@/services/payment/payments";
import { DollarSign, Calendar, Users, Zap, Tag, Clock } from "lucide-react";
import React from "react";

const formatDate = (dateStr: string | number | Date) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const getStatusClasses = (status: string) => {
  switch (status?.toUpperCase()) {
    case "PAID":
      return "bg-green-500 text-white shadow-md shadow-green-200";
    case "COMPLETE":
      return "bg-blue-500 text-white shadow-md shadow-blue-200";
    case "FAILED":
      return "bg-red-500 text-white shadow-md shadow-red-200";
    case "UNPAID":
      return "bg-yellow-500 text-white shadow-md shadow-yellow-200";
    default:
      return "bg-gray-500 text-white shadow-md shadow-gray-200";
  }
};

const Payments = async () => {
  const response = await getMyPayments();
  const payments = response.reviews || [];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          💳 Transaction History
        </h1>
        <p className="text-gray-500 mt-2">
          A record of all bookings and payments for events you&apos;ve joined.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="text-center p-12 border-2 border-dashed border-gray-300 rounded-xl bg-white shadow-lg">
          <Zap className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-xl text-gray-700 font-semibold">
            No payment records found.
          </p>
          <p className="text-gray-500 mt-1">
            Your transactions will appear here after you book and pay for an
            event.
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {payments.map((payment: any) => {
            const { booking, amount, status, transactionId, createdAt, _id } =
              payment;
            const event = booking?.event || {};

            return (
              <div
                key={_id}
                className="border-t-4 border-indigo-500 rounded-xl shadow-2xl p-6 lg:p-8 bg-white transition duration-300 hover:shadow-3xl flex flex-col md:flex-row justify-between items-start md:items-stretch"
              >
                <div className="space-y-4 flex-1 pr-0 md:pr-8 w-full md:w-auto">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-extrabold text-gray-800 leading-tight">
                      {event.name || "Unknown Event"}
                    </h2>
                    <span
                      className={`px-4 py-1.5 rounded-full font-bold text-xs shrink-0 ${getStatusClasses(
                        status
                      )}`}
                    >
                      {status?.toUpperCase() || "N/A"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm text-gray-600 border-t pt-4 mt-4">
                    <p className="flex items-center gap-2">
                      <Calendar size={16} className="text-blue-600" />
                      <span className="font-semibold">Event Date:</span>{" "}
                      {formatDate(event.date)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users size={16} className="text-teal-600" />
                      <span className="font-semibold">Guests:</span>{" "}
                      {booking?.guestCount || 1}
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock size={16} className="text-pink-600" />
                      <span className="font-semibold">Booked On:</span>{" "}
                      {formatDate(createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                      <Tag size={16} className="text-orange-600" />
                      <span className="font-semibold">Unit Fee:</span> $
                      {event.joiningFee?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-64 flex flex-col items-start md:items-end justify-between md:border-l md:pl-6 pt-4 md:pt-0">
                  <div className="flex flex-col items-start md:items-end mb-4">
                    <p className="text-3xl font-extrabold text-green-700 flex items-center gap-1">
                      <DollarSign size={24} className="text-green-600" />$
                      {amount?.toFixed(2) || "0.00"}
                    </p>
                    <p className="text-sm text-gray-500 font-medium">
                      TOTAL PAID
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 break-all">
                    **Transaction ID:** {transactionId || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Payments;
