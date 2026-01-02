import DashboardStatsSkeleton from "../../../components/skeletons/DashboardStatsSkeleton";
import RecentApplicationsSkeleton from "../../../components/skeletons/RecentApplicationsSkeleton";
import Skeleton from "../../../components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="space-y-10">
      <div>
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      <DashboardStatsSkeleton />

      <div className="flex items-center justify-between mt-10">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-24" />
      </div>

      <RecentApplicationsSkeleton />
    </div>
  );
}
