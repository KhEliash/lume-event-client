/* eslint-disable @typescript-eslint/no-explicit-any */
import { getMyPayments } from "@/services/payment/payments";
import { Calendar, Users, Zap, Tag, Clock, ReceiptText } from "lucide-react";
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
  const base =
    "px-3 py-1 border-2 font-black text-[10px] uppercase tracking-widest ";
  switch (status?.toUpperCase()) {
    case "PAID":
    case "COMPLETE":
      return (
        base +
        "bg-emerald-100 border-emerald-950 text-emerald-950 shadow-[2px_2px_0px_0px_rgba(6,78,59,1)]"
      );
    case "FAILED":
      return (
        base +
        "bg-red-100 border-red-950 text-red-950 shadow-[2px_2px_0px_0px_rgba(153,27,27,1)]"
      );
    case "UNPAID":
      return (
        base +
        "bg-amber-100 border-amber-950 text-amber-950 shadow-[2px_2px_0px_0px_rgba(251,191,36,1)]"
      );
    default:
      return base + "bg-gray-100 border-gray-950 text-gray-950";
  }
};

const Payments = async () => {
  const response = await getMyPayments();
  const payments = response.reviews || []; // Note: Ensure your API returns .reviews or .result

  return (
    <div className="p-4 md:p-10  space-y-10 min-h-screen">
      {/* Header Section */}
      <div className="border-b-4 border-emerald-950 pb-6 flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-emerald-950 uppercase tracking-tighter">
            Financial Ledger
          </h1>
          <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em] mt-2">
            Verified transactions & booking receipts
          </p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-950 text-amber-400 px-4 py-2 border-2 border-emerald-950 font-black text-sm uppercase">
          <ReceiptText size={18} /> Total Records: {payments.length}
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-24 border-4 border-dashed border-emerald-950/10">
          <Zap className="w-12 h-12 text-emerald-950/20 mx-auto mb-4" />
          <p className="text-emerald-950/40 font-black uppercase tracking-widest text-sm">
            No financial signals detected in your history.
          </p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-6">
          {payments.map((payment: any) => {
            const { booking, amount, status, transactionId, createdAt, _id } =
              payment;
            const event = booking?.event || {};

            return (
              <div
                key={_id}
                className="group relative bg-white border-2 border-emerald-950 p-6 md:p-8 hover:shadow-[10px_10px_0px_0px_rgba(6,78,59,1)] transition-all flex flex-col md:flex-row justify-between"
              >
                {/* Event & Status Info */}
                <div className="flex-1 space-y-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <h2 className="text-2xl font-black text-emerald-950 uppercase tracking-tighter group-hover:text-amber-600 transition-colors">
                      {event.name || "UNIDENTIFIED MISSION"}
                    </h2>
                    <span className={getStatusClasses(status)}>
                      {status || "PENDING"}
                    </span>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-dotted border-emerald-950/20 pt-6">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-950/60">
                      <Calendar size={14} className="text-amber-500" />
                      <span>Event: {formatDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-950/60">
                      <Users size={14} className="text-amber-500" />
                      <span>Units: {booking?.guestCount || 1} Person(s)</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-950/60">
                      <Clock size={14} className="text-amber-500" />
                      <span>Logged: {formatDate(createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-emerald-950/60">
                      <Tag size={14} className="text-amber-500" />
                      <span>Rate: {event.joiningFee || 0} USD</span>
                    </div>
                  </div>
                </div>

                {/* Amount & Transaction ID Section */}
                <div className="mt-8 md:mt-0 md:ml-10 md:pl-10 md:border-l-2 md:border-emerald-950 flex flex-col justify-center items-start md:items-end min-w-[200px]">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-950/40 mb-1">
                    Settlement Amount
                  </p>
                  <p className="text-4xl font-black text-emerald-950 flex items-center">
                    <span className="text-sm mr-1">USD</span>
                    {amount?.toLocaleString() || "0.00"}
                  </p>
                  <div className="mt-4 p-2 bg-emerald-50 border border-emerald-950/10 w-full md:w-auto">
                    <p className="text-[9px] font-bold text-emerald-800 break-all uppercase tracking-tighter">
                      TXID: {transactionId || "INTERNAL_CREDIT"}
                    </p>
                  </div>
                </div>

                {/* Decorative "Stamp" Effect */}
                <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap size={80} className="text-emerald-950" />
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
