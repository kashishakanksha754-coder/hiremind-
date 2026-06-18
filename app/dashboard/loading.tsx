export default function DashboardLoading() {
  return (
    <div className="mx-auto max-w-7xl animate-pulse space-y-8">
      {/* Greeting */}
      <div className="space-y-3">
        <div className="h-9 w-72 rounded-lg bg-bg-secondary" />
        <div className="h-4 w-48 rounded bg-bg-secondary" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-xl border border-border-subtle bg-card p-5"
          >
            <div className="h-12 w-12 rounded-xl bg-bg-secondary" />
            <div className="space-y-2">
              <div className="h-6 w-16 rounded bg-bg-secondary" />
              <div className="h-3 w-24 rounded bg-bg-secondary" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-3 rounded-xl border border-border-subtle bg-card p-6 lg:col-span-2">
          <div className="h-5 w-40 rounded bg-bg-secondary" />
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-bg-secondary" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-bg-secondary" />
                <div className="h-3 w-1/3 rounded bg-bg-secondary" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3 rounded-xl border border-border-subtle bg-card p-6">
          <div className="h-5 w-36 rounded bg-bg-secondary" />
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-lg border border-border-subtle bg-bg-secondary"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
