import Skeleton from "@/components/ui/skeleton/skeleton";
import { cn } from "@/libs/utils";

export const SummaryCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <ul className={cn("!space-y-3", className)}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li key={idx} className="roundedCard !bg-grey-25 !space-y-2">
          <div className="flex w-full justify-between">
            <Skeleton className="!h-3 !w-10" />
            <Skeleton className="!size-5 rounded-full" />
          </div>
          <div className="flex w-full justify-between">
            <div className="!space-y-2">
              <Skeleton className="!h-3 !w-16" />
              <Skeleton className="!h-3 !w-10" />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Skeleton className="!h-3 !w-16" />
              <Skeleton className="!h-3 !w-10" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};


export const StatsSkeleton = () => {
  return (
    <section>
      <h4 className="mb-4 !text-base !font-medium">Providers Balances</h4>
      <ul
        className={cn(
          "mt-2 mb-3 grid flex-1 grid-cols-1 gap-3 lg:grid-cols-3",

        )}
      >
        <li className="roundedCard  ">
          <p className="text-grey-600 !mb-4">SMSpool balance</p>
          <h3 className="!font-medium flex items-center gap-1">$  <Skeleton className="!h-4 w-full" /></h3>
        </li>
        <li className="roundedCard ">
          <p className="text-grey-600 !mb-4">Reloadly balance</p>
          <h3 className="!font-medium flex items-center gap-1">$  <Skeleton className="!h-4 w-full" /></h3>
        </li>
        <li className="roundedCard ">
          <p className="text-grey-600 !mb-4">JAP balance</p>
          <h3 className="!font-medium flex items-center gap-1">$  <Skeleton className="!h-4 w-full" /></h3>
        </li>
      </ul>
    </section>
  )
}