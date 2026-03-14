import { getOrdersByType } from "@/services/apis/orders.api";
import React from "react";
import TableWrapper from "./table/tableWrapper";
import { OrdersSearchParams, OrderTypes } from "@/types/orders.types";
import OrdersLayout from "../../pageLayout";
import EmptyState from "@/components/ui/emptyUI";

type OrdersLayout = {
  pageTitle: string;
  type: OrderTypes;
  params: OrdersSearchParams;
};

export default async function Orders({
  params,
  type,
  pageTitle,
}: OrdersLayout) {
  const { page, search } = params;
  const rsp = await getOrdersByType({ page: Number(page) || 1, type, search });

  // console.log("rsp>>", rsp?.body?.data);

  if (!rsp?.ok) {
    const { message, description } = rsp?.body;

    return (
      <OrdersLayout pageTitle={pageTitle}>
        <EmptyState
          title={message}
          subTitle={description}
          className="min-h-[70vh]"
        />
      </OrdersLayout>
    );
  }

  const { pageSize, totalCount, totalPages, orders } = rsp?.body?.data;

  const data = {
    pageSize,
    totalCount,
    totalPages,
    assets: orders,
  };

  if (search && totalCount === 0) {
    return (
      <OrdersLayout pageTitle={pageTitle}>
        <EmptyState
          title="No result"
          subTitle={
            <>
              No result found for: <b>{search}</b>{" "}
            </>
          }
          className="min-h-[70vh]"
        />
      </OrdersLayout>
    );
  }
  if (totalCount === 0) {
    return (
      <OrdersLayout pageTitle={pageTitle}>
        <EmptyState
          title={`No ${pageTitle} Datas`}
          subTitle={`No data found for ${pageTitle}, your ${pageTitle} datas will appear here when they are available`}
          className="min-h-[70vh]"
        />
      </OrdersLayout>
    );
  }

  return (
    <OrdersLayout pageTitle={pageTitle} data={data}>
      <TableWrapper title={pageTitle} type={type} containerClassName="mt-6" />
    </OrdersLayout>
  );
}
