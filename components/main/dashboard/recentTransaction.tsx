import React from "react";
import { OrdersSearchParams } from "@/types/orders.types";
import OrdersLayout from "../../pageLayout.jsx";
import { getTransactionsApi } from "@/services/apis/transaction.api";
import EmptyState from "@/components/ui/emptyUI.jsx";
import TableWrapper from "../orders/table/tableWrapper";

const RecentTransaction = async ({
  params,
}: {
  params: OrdersSearchParams;
}) => {
  const { page, search } = params;
  const rsp = await getTransactionsApi({ page: Number(page) || 1, search });

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
    <main className="roundedCard col-span-3">
      <h4 className="text-grey-600 mb-4 !text-base !font-medium">
        Recent Transactions
      </h4>
      <OrdersLayout pageTitle={pageTitle} data={data} recent>
        <TableWrapper
          title="Transactions"
          type="transaction"
          containerClassName="mt-6"
        />
      </OrdersLayout>
    </main>
  );
};

export default RecentTransaction;
