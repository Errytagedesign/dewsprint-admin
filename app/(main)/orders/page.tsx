import React, { Suspense, use } from "react";
import { Metadata } from "next";
import { OrdersSearchParams } from "@/types/orders";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import Orders from "@/components/main/orders/orders";

export const metadata: Metadata = {
  title: "Orders",
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
        <Orders params={params} />
      </Suspense>
    </main>
  );
}
