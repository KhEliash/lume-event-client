import MyHostedEvents from "@/components/modules/Host/MyHostedEvents";

const HostedEvents = () => {
  return (
    <div className="min-h-svh w-full p-6 md:p-10 bg-[#fafafa]">
      <header className="mb-10 border-b-4 border-emerald-950 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-emerald-950 italic">
            My Hosted <span className="text-amber-500">Events</span>
          </h1>
          <p className="text-emerald-800 font-bold text-xs uppercase tracking-widest mt-1">
            Command Center / Event Management
          </p>
        </div>
      </header>
      <MyHostedEvents />
    </div>
  );
};

export default HostedEvents;
