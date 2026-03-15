"use client";

import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import { CustomerType } from "@/types/customers";
import { customerColData } from "@/utils/constants";
import React from "react";
import { EmptyState } from "@/components/ui/emptyUI";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";

const CustomerTable = () => {
  const { data, isPending, searchValue, filterValue } = usePaginationContext();

  const customerData = data?.assets as CustomerType[];

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
        title={`No Customers Datas`}
        subTitle={`Customers datas will appear here when they are available`}
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
