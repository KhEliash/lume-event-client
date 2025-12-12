import Head from "next/head";

import React from "react";
import { Target, Heart, Zap, Globe, Users, Trophy, Star } from "lucide-react";

// Reusable Value Card Component
interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
  <div className="p-6 bg-white border border-gray-100 rounded-xl shadow-md transition duration-300 hover:shadow-lg">
    <div className="flex items-center mb-4">
      {/* Type-fixed icon usage */}
      {React.cloneElement(
        icon as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
        { className: "w-8 h-8 text-indigo-600" }
      )}
      <h3 className="text-xl font-bold text-gray-900 ml-3">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

// --- Main About Page Component ---
export default function About() {
  return (
    <>
      <Head>
        <title>About Us | Event Management Platform</title>
        <meta
          name="description"
          content="Learn about our mission to connect communities through unforgettable local events."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-50 min-h-screen">
        {/* --- 1. Hero / Mission Section --- */}
        <section className="py-20 bg-indigo-700 text-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
              Connecting Communities, One Event at a Time.
            </h1>
            <p className="text-xl font-light max-w-3xl mx-auto">
              We are dedicated to making local engagement simple, accessible,
              and meaningful for everyone.
            </p>
          </div>
        </section>

        {/* --- 2. Our Story / Narrative Section --- */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-8 h-8 text-indigo-600 mr-3" /> Our Founding
                Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                We started in 2022 with a simple observation: despite living in
                an hyper-connected world, finding genuine, local, interest-based
                events was surprisingly difficult. Our founders believed that
                real connection happens face-to-face, rooted in shared passion.
              </p>
              <p className="text-lg text-gray-700">
                EventApp was built to bridge that gap—providing a platform where
                hosts can effortlessly manage and monetize their passions, and
                where users can discover the perfect local event tailored to
                their interests, eliminating endless searching.
              </p>

              {/* <Link href="/host" passHref legacyBehavior>
                                <a className="mt-8 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition">
                                    Ready to Host? Get Started
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </a>
                            </Link> */}
            </div>

            <div className="lg:h-full flex items-center justify-center"></div>
          </div>
        </section>

        {/* --- 3. Our Core Values --- */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              The Values That Guide Us
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <ValueCard
                icon={<Heart />}
                title="Authenticity"
                description="We prioritize genuine, human interaction over digital noise. Every event listing is transparent and real."
              />
              <ValueCard
                icon={<Zap />}
                title="Empowerment"
                description="We empower local hosts—the passion economy—by giving them the best tools to manage, monetize, and grow their community."
              />
              <ValueCard
                icon={<Globe />}
                title="Inclusion"
                description="Our platform is designed to welcome everyone, fostering diverse local communities through shared interests."
              />
            </div>
          </div>
        </section>

        {/* --- 4. Impact and Metrics --- */}
        <section className="py-20 bg-indigo-600">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-12">
              Our Impact To Date
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-white">
                <Trophy className="w-10 h-10 mx-auto mb-3" />
                <p className="text-5xl font-extrabold">25k+</p>
                <p className="text-lg mt-1 text-indigo-200">
                  Successful Events
                </p>
              </div>
              <div className="text-white">
                <Users className="w-10 h-10 mx-auto mb-3" />
                <p className="text-5xl font-extrabold">300k+</p>
                <p className="text-lg mt-1 text-indigo-200">Registered Users</p>
              </div>
              <div className="text-white">
                <Globe className="w-10 h-10 mx-auto mb-3" />
                <p className="text-5xl font-extrabold">75</p>
                <p className="text-lg mt-1 text-indigo-200">Cities Served</p>
              </div>
              <div className="text-white">
                <Star className="w-10 h-10 mx-auto mb-3" />
                <p className="text-5xl font-extrabold">4.9</p>
                <p className="text-lg mt-1 text-indigo-200">
                  Average Host Rating
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
