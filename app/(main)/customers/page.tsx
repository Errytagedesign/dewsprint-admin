import React, { Suspense } from "react";
import { Metadata } from "next";
import Customers from "@/components/main/customer/customers";
import { OrdersSearchParams } from "@/types/orders";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";

export const metadata: Metadata = {
  title: "Customers",
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
        <Customers params={params} />
      </Suspense>
    </main>
  );
}
