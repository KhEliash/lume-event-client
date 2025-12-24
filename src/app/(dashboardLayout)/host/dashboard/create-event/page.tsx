import { CreateEventForm } from "@/components/modules/Host/CreateEventForm";

const HostCreatePage = () => {
  return (
    <div className="min-h-screen w-full px-4 md:px-10 py-6 bg-white">
      <div className=" mx-auto">
        <div className="border-b-4 border-emerald-950 pb-6 mb-10">
          <h1 className="text-5xl font-black text-emerald-950 uppercase tracking-tighter">
            Initiate Event
          </h1>
          <p className="text-amber-600 font-bold text-xs uppercase tracking-[0.2em] mt-2">
            Protocol: Deploying new social engagement to the registry
          </p>
        </div>
        <CreateEventForm />
      </div>
    </div>
  );
};

export default HostCreatePage;
