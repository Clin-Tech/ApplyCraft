import Skeleton from "../ui/Skeleton";

export default function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white border border-slate-200 p-6 shadow-sm"
        >
          <Skeleton className="h-4 w-28 mb-4" />
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-20 mt-3" />
        </div>
      ))}
    </div>
  );
}
