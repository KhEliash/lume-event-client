import Categories from "@/components/homePage/Categories";
import Diagnostics from "@/components/homePage/Diagonistics";
import FinalCTA from "@/components/homePage/FinalCTA";
import Hero from "@/components/homePage/Hero";
import HostSection from "@/components/homePage/HostSection";
import LiveTicker from "@/components/homePage/LiveTicker";
import RecentRegistry from "@/components/homePage/RecentRegistry";
import Security from "@/components/homePage/Security";
import Treasury from "@/components/homePage/Treasury";
import { getAllEvents } from "@/services/host/event-actions";

export default async function LandingPage() {
  const eventRes = await getAllEvents(1, 10);
  const events = eventRes?.data || [];

  return (
    <main className="bg-[#fafafa] overflow-x-hidden">
      <Hero />
      <LiveTicker events={events} />
      <HostSection />
      <Categories />
      <Treasury />
      <Security />
      <RecentRegistry events={events.slice(0, 5)} />
      <Diagnostics />
      <FinalCTA />
    </main>
  );
}
