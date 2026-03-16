import React, { Suspense, use } from "react";
import { Metadata } from "next";
import { OrdersSearchParams } from "@/types/orders";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import Riders from "@/components/main/riders/riders";

export const metadata: Metadata = {
  title: "Riders",
};

export default function Page({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  const params = use(searchParams);

  return (
    <main className="roundedCard">
      <Suspense fallback={<TableSkeleton />}>
        <Riders params={params} />
      </Suspense>
    </main>
  );
}
