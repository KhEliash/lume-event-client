"use client";

import { XCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function FailClient() {
  const searchParams = useSearchParams();

  const transactionId = searchParams.get("transactionId") || "N/A";
  const message = searchParams.get("message") || "Payment Failed";
  const amount = searchParams.get("amount") || "0";
  const status = searchParams.get("status") || "fail";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <XCircleIcon className="mx-auto h-16 w-16 text-red-600" />
        <h1 className="mt-4 text-2xl font-bold text-red-600">{message}</h1>

        <p className="mt-2 text-gray-600">
          Transaction ID: <span className="font-mono">{transactionId}</span>
        </p>
        <p className="mt-1 text-gray-600">
          Amount: <span className="font-bold">${amount}</span>
        </p>
        <p className="mt-1 text-gray-500 uppercase tracking-wide">{status}</p>

        <div className="mt-6 flex justify-center gap-4">
          <a
            href="/events"
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            Go to Events
          </a>
        </div>
      </div>
    </div>
  );
}
