"use client";

import Head from "next/head";
import React, { useState, FormEvent } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Loader,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";

// --- Main Contact Page Component (NO EXTERNAL COMPONENTS) ---
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    // Fake API Submission Logic
    setTimeout(() => {
      setLoading(false);

      // Simulate success 80% of the time, failure 20%
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    }, 2000); // 2 second fake loading delay
  };

  const buttonContent = loading ? (
    <span className="flex items-center justify-center">
      <Loader className="w-5 h-5 mr-2 animate-spin" /> Sending...
    </span>
  ) : (
    <span className="flex items-center justify-center">
      Send Message <Send className="w-4 h-4 ml-2" />
    </span>
  );

  // Status message JSX placed directly in the render logic below
  let StatusMessage = null;
  if (status === "success") {
    StatusMessage = (
      <div className="flex items-center p-3 mb-4 text-green-700 bg-green-100 rounded-lg">
        <CheckCircle className="w-5 h-5 mr-2" />
        Message sent successfully! We will be in touch shortly.
      </div>
    );
  } else if (status === "error") {
    StatusMessage = (
      <div className="flex items-center p-3 mb-4 text-red-700 bg-red-100 rounded-lg">
        <XCircle className="w-5 h-5 mr-2" />
        Submission failed. Please try again later.
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Contact Us | Event Management Platform</title>
        <meta
          name="description"
          content="Get in touch with the Event Management Platform team for support or partnership inquiries."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-50 py-16 md:py-24 min-h-[calc(100vh-100px)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
              Contact Our Team
            </h1>
            <p className="text-xl text-gray-600">
              We’re here to help you host, explore, and connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* 1. Contact Information Block */}
            <div className="lg:col-span-1 space-y-8 p-6 bg-white rounded-xl shadow-lg border">
              <h2 className="text-2xl font-bold text-gray-900">
                Reach Out Directly
              </h2>

              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Email Support</p>
                  <p className="text-gray-600">support@eventapp.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Phone</p>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Headquarters</p>
                  <p className="text-gray-600">
                    123 Event Lane, Suite 100, Metropolis, USA
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Contact Form Block */}
            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-lg border"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Send us a message
                </h3>

                {StatusMessage}

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      disabled={loading}
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full mt-6 py-3 px-4 rounded-lg font-semibold text-white transition duration-300 ${
                    loading
                      ? "bg-indigo-400 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700 shadow-md"
                  }`}
                  disabled={loading}
                >
                  {buttonContent}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
