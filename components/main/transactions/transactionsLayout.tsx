"use client";
import React, { ReactNode } from "react";
import {
  PaginationProvider,
  usePaginationContext,
} from "@/context/paginateContext";
import { UsePaginateData } from "@/hooks/usePagination";
import TablePagination from "@/components/ui/tableComponent/tablePaginations";
import Search from "@/components/ui/search";
import { SelectInput } from "@/components/ui/select/SelectInput";
import Button from "@/components/ui/button";
import { LuMoveUpRight } from "react-icons/lu";
import { TransactionStatusType } from "@/types/transactions";

type OrdersLayout = {
  data?: UsePaginateData;
  children: ReactNode;
};

const transactionFilterData: Array<{
  title: string;
  value: TransactionStatusType;
}> = [
  { title: "Pending", value: "PENDING" },
  { title: "Refunded", value: "REFUNDED" },
  { title: "Succeeded", value: "SUCCEEDED" },
  { title: "Failed", value: "FAILED" },
  { title: "Cancelled", value: "CANCELED" },
];

export default function TransactionsLayout({ data, children }: OrdersLayout) {
  return (
    <PaginationProvider data={data as UsePaginateData}>
      <main className={`space-y-3 pb-20`}>
        <OrderPageHeader />

        {children}
        <TablePagination />
      </main>
    </PaginationProvider>
  );
}

export const OrderPageHeader = () => {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-6">
      <h4 className="text-grey-800 !text-lg !font-medium">Orders</h4>

      <article className="flex w-full flex-1 flex-wrap items-center justify-normal gap-2 lg:justify-end">
        <Search placeholder="Search by tracking id" className="!max-w-xs" />
        <div className="inline-flex w-fit gap-2">
          <TransactionFilter />
        </div>

        <Button className="outline-btn !text-grey-400 !min-h-auto !w-fit !px-3 !py-2 !font-normal">
          <LuMoveUpRight size={10} /> Export{" "}
        </Button>
      </article>
    </section>
  );
};

const TransactionFilter = () => {
  const { filterValue, handleFilterUrl } = usePaginationContext();

  return (
    <>
      <SelectInput
        name="status"
        placeholder="Status"
        options={transactionFilterData}
        keyPropertyName="title"
        valuePropertyName="value"
        itemPropertyName="title"
        selected={filterValue || ""}
        onChange={(e) => handleFilterUrl(e)}
        className="!h-[38px] !w-full min-w-40 !rounded-lg !px-3 !py-2"
      />

      {filterValue && (
        <button
          onClick={() => handleFilterUrl("")}
          className="bg-error rounded-lg px-2 py-1 text-xs text-white"
        >
          Reset
        </button>
      )}
    </>
  );
};
