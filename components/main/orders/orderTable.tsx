"use client";

import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import { ordersColData } from "@/utils/constants";
import React from "react";
import { EmptyState } from "@/components/ui/emptyUI";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { OrderType } from "@/types/orders";

export const OrderTable = () => {
  const { data, isPending, searchValue, filterValue } = usePaginationContext();

  const customerData = data?.assets as OrderType[];

  if ((filterValue || searchValue) && customerData?.length === 0) {
    return (
      <EmptyState
        title="No result"
        subTitle={` No result found for: ${searchValue || filterValue}`}
        className="min-h-[70vh]"
      />
    );
  }
  if (customerData?.length === 0) {
    return (
      <EmptyState
        title={`No Order Datas`}
        subTitle={`Order datas will appear here when they are available`}
        className="min-h-[70vh]"
      />
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="All Orders"
          columns={ordersColData}
          data={data?.assets as OrderType[]}
          containerClassName="mt-6"
        />
      )}
    </>
  );
};
