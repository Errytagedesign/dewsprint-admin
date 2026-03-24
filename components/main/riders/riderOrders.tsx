import React from "react";
import { OrdersSearchParams } from "@/types/orders";
import { ErrorUI } from "@/components/ui/emptyUI";
import { PaginationProvider } from "@/context/paginateContext";
import { RiderOrderTable } from "./riderTable";
import { getRiderOrdersApi } from "@/services/apis/riders.api";

export default async function RiderOrders({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { id, page } = params;

  const rsp = await getRiderOrdersApi({
    page: page || "1",
    riderId: id as string,
  });

  if (!rsp?.ok) {
    const { message, code } = rsp?.body;
    return <ErrorUI code={code} message={message} className="min-h-[70vh]" />;
  }

  const { pagination, orders } = rsp?.body?.data;

  const data = {
    ...pagination,
    assets: orders,
  };

  return (
    <PaginationProvider data={data}>
      <RiderOrderTable />
    </PaginationProvider>
  );
}
