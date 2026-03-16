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
import { OrderStatusType, PaymentStatusType } from "@/types/orders";

type OrdersLayout = {
  data?: UsePaginateData;
  children: ReactNode;
};

export const filterData: Array<{ title: string; value: OrderStatusType }> = [
  { title: "Pending", value: "PENDING" },
  { title: "Assigned", value: "ASSIGNED" },
  { title: "Accepted", value: "ACCEPTED" },
  { title: "Arrived", value: "ARRIVED" },
  { title: "Picked up", value: "PICKED_UP" },
  { title: "In transit", value: "IN_TRANSIT" },
  { title: "Delivered", value: "DELIVERED" },
  { title: "Completed", value: "COMPLETED" },
  { title: "Cancelled", value: "CANCELLED" },
];

const payemntFilterData: Array<{ title: string; value: PaymentStatusType }> = [
  { title: "Paid", value: "PAID" },
  { title: "Pending", value: "PENDING" },
  { title: "Refunded", value: "REFUNDED" },
  { title: "Failed", value: "FAILED" },
];

export default function OrdersLayout({ data, children }: OrdersLayout) {
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
          <FilterByOrderStatus />
        </div>
        <div className="inline-flex w-fit gap-2">
          <FilterByPaymentStatus />
        </div>
        <Button className="outline-btn !text-grey-400 !min-h-auto !w-fit !px-3 !py-2 !font-normal">
          <LuMoveUpRight size={10} /> Export{" "}
        </Button>
      </article>
    </section>
  );
};

const FilterByOrderStatus = () => {
  const { filterValue, handleFilterUrl } = usePaginationContext();

  return (
    <>
      <SelectInput
        name="status"
        placeholder="Order Status"
        options={filterData}
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

const FilterByPaymentStatus = () => {
  const { payemtnFilterValue, handlePaymentFilterUrl } = usePaginationContext();

  return (
    <>
      <SelectInput
        name="paymentStatus"
        placeholder="Payment Status"
        options={payemntFilterData}
        keyPropertyName="title"
        valuePropertyName="value"
        itemPropertyName="title"
        selected={payemtnFilterValue || ""}
        onChange={(e) => handlePaymentFilterUrl(e)}
        className="!h-[38px] !w-full min-w-40 !rounded-lg !px-3 !py-2"
      />
      {payemtnFilterValue && (
        <button
          onClick={() => handlePaymentFilterUrl("")}
          className="bg-error rounded-lg px-2 py-1 text-xs text-white"
        >
          Clear
        </button>
      )}
    </>
  );
};
