"use client";

import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SuccessClient() {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message = searchParams.get("message") || "Payment Completed Successfully";
  const amount = searchParams.get("amount") || "0";
  const status = searchParams.get("status") || "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <CheckCircleIcon className="mx-auto h-16 w-16 text-green-600" />
        <h1 className="mt-4 text-2xl font-bold text-green-600">{message}</h1>

        <p className="mt-2 text-gray-600">
          Transaction ID: <span className="font-mono">{transactionId}</span>
        </p>
        <p className="mt-1 text-gray-600">
          Amount: <span className="font-bold">${amount}</span>
        </p>
        <p className="mt-1 text-gray-500 uppercase tracking-wide">{status}</p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            href="/events"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Go to Events
          </Link>
          <Link
            href="/dashboard/payments"
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}
