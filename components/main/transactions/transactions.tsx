import React from "react";
import { OrdersSearchParams } from "@/types/orders";
import { ErrorUI } from "@/components/ui/emptyUI";
import TransactionsLayout from "./transactionsLayout";
import { TransactionsTable } from "./transactionsTable";
import { getTransactionsApi } from "@/services/apis/transaction.api";

export default async function Transactions({
  params,
}: {
  params: OrdersSearchParams;
}) {
  const { page, search, status } = params;

  const rsp = await getTransactionsApi({
    page: page || "1",
    status: status,
  });

  if (!rsp?.ok) {
    const { message, code } = rsp?.body;
    return <ErrorUI code={code} message={message} className="min-h-[70vh]" />;
  }

  const { pagination, transactions } = rsp?.body?.data;

  const data = {
    ...pagination,
    assets: transactions,
  };

  return (
    <TransactionsLayout data={data}>
      <TransactionsTable />
    </TransactionsLayout>
  );
}
