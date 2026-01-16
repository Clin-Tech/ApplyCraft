function DashboardPreviewInteractive() {
  const mockJobs = [
    { company: "Google", role: "Frontend Engineer", status: "interviewing" },
    { company: "Meta", role: "React Developer", status: "applied" },
    { company: "Netflix", role: "UI Engineer", status: "applied" },
  ];

  const stats = [
    { label: "Total", value: 12, color: "from-blue-500 to-blue-600" },
    { label: "Applied", value: 8, color: "from-purple-600 to-blue-600" },
    { label: "Interviewing", value: 3, color: "from-green-500 to-green-600" },
    { label: "Offers", value: 1, color: "from-amber-500 to-amber-600" },
  ];

  return (
    <div className="w-full mt-16 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none z-10" />
      <div className="rounded-2xl border-4 border-slate-200 shadow-2xl overflow-hidden bg-white">
        <div className="bg-slate-100 px-4 py-3 flex items-center gap-2 border-b border-slate-200">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm font-medium text-slate-600">
            ApplyCraft Dashboard (Demo)
          </div>
        </div>

        <div className="w-full p-6 bg-gradient-to-br from-purple-50 to-blue-50">
          <div className="w-full flex gap-3 mb-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`w-1/4 p-3 rounded-lg bg-gradient-to-br ${s.color} text-white text-center`}
              >
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs opacity-90">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {mockJobs.map((job, i) => (
              <div
                key={i}
                className="bg-white p-3 rounded-lg border border-slate-200 flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold text-sm text-slate-900">
                    {job.role}
                  </div>
                  <div className="text-xs text-slate-600">{job.company}</div>
                </div>
                <div
                  className={`text-xs px-3 py-1 rounded ${
                    job.status === "interviewing"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {job.status}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-white rounded-lg border-2 border-purple-300 text-center">
            <p className="text-sm font-semibold text-slate-900 mb-2">
              This is demo data
            </p>
            <a
              href="/signup"
              className="inline-block px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-sm hover:scale-105 transition-transform"
            >
              Sign up to track your own applications
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPreviewInteractive;
