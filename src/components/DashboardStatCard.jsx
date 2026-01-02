export default function DashboardStatCard({
  icon: Icon,
  label,
  value,
  trend,
  color,
}) {
  return (
    <div className="group relative rounded-2xl bg-white border border-slate-200 p-6 hover:shadow-xl hover:border-[#8a61ee] transition-all duration-300">
      <div
        className={`absolute top-0 right-0 w-28 h-28 ${color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity`}
      />

      <div className="relative flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-600">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 mt-2 font-medium">{trend}</p>
          )}
        </div>

        <div
          className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center group-hover:scale-110 transition-transform`}
        >
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
