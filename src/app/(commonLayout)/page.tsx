// src/app/page.tsx (or src/components/LandingPage.tsx)
import React from "react";
import {
  Search,
  MapPin,
  Users,
  Zap,
  Star,
  Globe,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* --- 1. Hero Section: Hook the user immediately --- */}
      <section className="bg-gray-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-4">
            Find & Host <span className="text-indigo-600">Events</span> That
            Matter
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Connect with your local community. Discover unique experiences, from
            tech meetups to outdoor adventures.
          </p>

          {/* Call to Action (CTA) */}
          <div className="flex justify-center space-x-4">
            <Link href={"/events"}>
              <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 flex items-center">
                Explore Events <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
            
          </div>

          {/* Placeholder for visual credibility */}
          <div className="mt-16"></div>
        </div>
      </section>

      {/* --- 2. Features/How It Works: Explain the core value --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Seamlessly Connect & Discover
          </h2>
          <p className="text-lg text-gray-600 text-center mb-16">
            It only takes three simple steps to join the action.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="flex justify-center mb-4">
                <Search className="w-10 h-10 text-indigo-500 bg-indigo-50 p-2 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                1. Explore
              </h3>
              <p className="text-gray-600">
                Browse thousands of local events by category, date, or location.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="flex justify-center mb-4">
                <MapPin className="w-10 h-10 text-green-500 bg-green-50 p-2 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                2. Join
              </h3>
              <p className="text-gray-600">
                Secure your spot instantly and get all the event details right
                on your dashboard.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center p-6 border rounded-xl shadow-sm hover:shadow-lg transition duration-300">
              <div className="flex justify-center mb-4">
                <Users className="w-10 h-10 text-yellow-500 bg-yellow-50 p-2 rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                3. Connect
              </h3>
              <p className="text-gray-600">
                Meet new people, share experiences, and expand your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. Social Proof/Stats: Build Trust --- */}
      <section className="bg-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-indigo-900 mb-12">
            Trusted by a Growing Global Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-4">
              <Zap className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-indigo-900">12k+</p>
              <p className="text-sm text-indigo-700 mt-1">Events Hosted</p>
            </div>

            <div className="p-4">
              <Globe className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-indigo-900">50+</p>
              <p className="text-sm text-indigo-700 mt-1">Cities Worldwide</p>
            </div>

            <div className="p-4">
              <Users className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-indigo-900">250k+</p>
              <p className="text-sm text-indigo-700 mt-1">Active Users</p>
            </div>

            <div className="p-4">
              <Star className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
              <p className="text-4xl font-extrabold text-indigo-900">4.9</p>
              <p className="text-sm text-indigo-700 mt-1">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. Callout/Secondary CTA: Focus on Hosting --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center bg-gray-900 text-white rounded-xl shadow-2xl p-10 md:p-16">
          <div className="lg:w-2/3 lg:pr-12 text-center lg:text-left mb-8 lg:mb-0">
            <h2 className="text-4xl font-extrabold mb-3">
              Ready to Share Your Passion?
            </h2>
            <p className="text-lg text-gray-300">
              Becoming a host is simple. Monetize your skills, build your
              community, and manage everything from a single dashboard.
            </p>
          </div>

          <div className="lg:w-1/3 flex justify-center lg:justify-end">
            <div className="bg-teal-400 text-gray-900 font-bold py-4 px-10 rounded-full shadow-xl hover:bg-teal-300 transition duration-300 text-lg flex items-center">
              Start Hosting Today <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </div>
        </div>
      </section>

    
    </div>
  );
};

export default LandingPage;
