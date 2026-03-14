"use client";

import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import { CustomerType } from "@/types/customers";
import { customerColData } from "@/utils/constants";
import React from "react";
import OrdersLayout from "../../pageLayout";
import { EmptyState } from "@/components/ui/emptyUI";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";

const CustomerTable = () => {
  const { data, isPending, searchValue } = usePaginationContext();

  if (searchValue && data?.assets?.length === 0) {
    return (
      <OrdersLayout pageTitle="Customers">
        <EmptyState
          title="No result"
          subTitle={` No result found for: ${searchValue}`}
          className="min-h-[70vh]"
        />
      </OrdersLayout>
    );
  }
  if (data?.assets?.length === 0) {
    return (
      <OrdersLayout pageTitle="Customers">
        <EmptyState
          title={`No Customers Datas`}
          subTitle={`No data found for Customers, your Customers datas will appear here when they are available`}
          className="min-h-[70vh]"
        />
      </OrdersLayout>
    );
  }

  return (
    <>
      {isPending ? (
        <TableSkeleton />
      ) : (
        <TableComponent
          title="All Customers"
          columns={customerColData}
          data={data?.assets as CustomerType[]}
          containerClassName="mt-6"
        />
      )}
    </>
  );
};

export default CustomerTable;
