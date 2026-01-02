import Skeleton from "../ui/Skeleton";

export default function JobDetailsSkeleton() {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="h-8 w-72 mb-3" />
        <Skeleton className="h-5 w-40" />
      </div>

      <div className="flex flex-wrap gap-4">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <div className="flex gap-4 mt-4">
        <Skeleton className="h-11 w-36 rounded-xl" />
        <Skeleton className="h-11 w-36 rounded-xl" />
      </div>

      <div className="grid md:grid-cols-3 gap-10 mt-12">
        <div className="md:col-span-2 space-y-4">
          <Skeleton className="h-5 w-52" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-white">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-36" />
        </div>
      </div>
    </div>
  );
}
