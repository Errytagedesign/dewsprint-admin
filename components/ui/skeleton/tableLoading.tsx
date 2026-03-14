import { cn } from "@/libs/utils";
import React from "react";
import Skeleton from "./skeleton";

const TableLoading = ({
  className,
  num,
}: {
  className?: string;
  num?: number;
}) => {
  return (
    <div className={cn("grid grid-cols-1 gap-3", className)}>
      {[...Array(num ? num : 9)].map((_, idx) => (
        <Skeleton key={idx} className="!h-10" />
      ))}
    </div>
  );
};

export default TableLoading;
