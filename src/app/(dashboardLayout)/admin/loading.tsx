export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen bg-white">
      <main className="flex-1 overflow-hidden">
        {/* Dashboard Navbar Skeleton */}
        <header className="h-16 border-b border-emerald-950/5 flex items-center justify-between px-8 bg-white">
          <div className="h-5 w-32 bg-emerald-950/10 animate-pulse rounded-full" />
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-emerald-950/5 animate-pulse" />
            <div className="h-8 w-8 rounded-full bg-emerald-950/10 animate-pulse" />
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Welcome Text Skeleton */}
          <div className="space-y-2">
            <div className="h-8 w-48 bg-emerald-950/10 animate-pulse rounded-br-xl rounded-tl-xl" />
            <div className="h-4 w-64 bg-emerald-950/5 animate-pulse rounded-full" />
          </div>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="p-6 border-2 border-emerald-950/5 bg-white space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 bg-amber-400/10 rounded-lg animate-pulse" />
                  <div className="h-4 w-12 bg-emerald-950/5 rounded-full" />
                </div>
                <div className="h-6 w-16 bg-emerald-950/10 animate-pulse" />
                <div className="h-3 w-24 bg-emerald-950/5 animate-pulse" />
              </div>
            ))}
          </div>

          {/* Main Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Table/List Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              <div className="h-6 w-32 bg-emerald-950/10 mb-4" />
              <div className="border border-emerald-950/5 rounded-none overflow-hidden">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-emerald-950/5 p-4 flex justify-between"
                  >
                    <div className="flex gap-4">
                      <div className="h-10 w-10 bg-emerald-950/5 rounded-none" />
                      <div className="space-y-2">
                        <div className="h-4 w-32 bg-emerald-950/10" />
                        <div className="h-3 w-20 bg-emerald-950/5" />
                      </div>
                    </div>
                    <div className="h-8 w-20 bg-emerald-950/5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Activity Skeleton */}
            <div className="space-y-4">
              <div className="h-6 w-32 bg-emerald-950/10" />
              <div className="bg-emerald-950/5 h-[400px] w-full border-l-4 border-amber-400 p-6 space-y-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-400 mt-1" />
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-full bg-emerald-950/10" />
                      <div className="h-3 w-1/2 bg-emerald-950/5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
