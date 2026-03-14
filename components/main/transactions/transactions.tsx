import React from "react";
import OrdersLayout from "../../pageLayout.jsx";
import EmptyState from "@/components/ui/emptyUI.jsx";
import { OrdersSearchParams } from "@/types/orders.types";
import {
  getTransactionsApi,
  getTransactionsByUserIdApi,
} from "@/services/apis/transaction.api";
import TableWrapper from "../orders/table/tableWrapper";

export default async function Transactions({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { userId, page, search, filter } = params;

  const rsp = userId
    ? await getTransactionsByUserIdApi({
        userId,
        page: Number(page) || 1,
        type: filter,
        search,
      })
    : await getTransactionsApi({
        page: Number(page) || 1,
        type: filter,
        search,
      });

  const pageTitle = "Transactions";

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

  const { pageSize, totalCount, totalPages, transactions } = rsp?.body;

  const data = {
    pageSize,
    totalCount,
    totalPages,
    assets: transactions,
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
      <TableWrapper
        title="Transactions"
        type="transaction"
        containerClassName="mt-6"
      />
    </OrdersLayout>
  );
}
