export default function Skeleton({ className = "" }) {
  return (
    <div className={`bg-slate-200/70 animate-pulse rounded-md ${className}`} />
  );
}
