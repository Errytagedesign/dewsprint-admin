import React, { Suspense } from "react";
import { OrdersSearchParams } from "@/types/orders.types";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<OrdersSearchParams>;
}) {
  const params = await searchParams;

  return (
    <main className="roundedCard">
      {/* <Suspense fallback={<TableLoading />}>
        <Transactions params={params} />
      </Suspense> */}
    </main>
  );
}
