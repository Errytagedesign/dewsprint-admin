import { getOrdersByType } from "@/services/apis/orders.api";
import React from "react";
import { OrdersSearchParams, OrderStatusType } from "@/types/orders";
import { ErrorUI } from "@/components/ui/emptyUI";
import OrdersLayout from "./ordersLayout";
import { OrderTable } from "./orderTable";

export default async function Orders({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { page, search, status } = params;

  const rsp = await getOrdersByType({
    page: page || "1",
    status: status as OrderStatusType,
    trackingCode: search,
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
    <OrdersLayout data={data}>
      <OrderTable />
    </OrdersLayout>
  );
}
