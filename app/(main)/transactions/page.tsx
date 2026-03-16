import React, { Suspense, use } from "react";

import { Metadata } from "next";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { OrdersSearchParams } from "@/types/orders";
import Transactions from "@/components/main/transactions/transactions";

export const metadata: Metadata = {
  title: "Transactions",
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
        <Transactions params={params} />
      </Suspense>
    </main>
  );
}
