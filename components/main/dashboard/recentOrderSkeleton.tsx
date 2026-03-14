import Skeleton from "@/components/ui/skeleton/skeleton";
import { cn } from "@/libs/utils";

export const RecentOrderSkeleton = ({ className }: { className?: string }) => {
  return (
    <ul className={cn("!space-y-3", className)}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li
          key={idx}
          className="card flex items-center justify-between !space-y-2 px-4"
        >
          <div>
            <Skeleton className="!size-8 rounded-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="!h-3 !w-10" />
            <Skeleton className="!h-3 !w-4" />
          </div>
        </li>
      ))}
    </ul>
  );
};
