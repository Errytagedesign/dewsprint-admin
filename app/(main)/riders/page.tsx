import React, { Suspense } from "react";
import { Metadata } from "next";
import { OrdersSearchParams } from "@/types/orders";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import Riders from "@/components/main/riders/riders";

export const metadata: Metadata = {
  title: "Riders",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  const params = await searchParams;

  return (
    <main className="roundedCard">
      <Suspense fallback={<TableSkeleton />}>
        <Riders params={params} />
      </Suspense>
    </main>
  );
}
