"use client";

import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import {
  riderDocsColData,
  riderOrdersColData,
  ridersColData,
} from "@/utils/constants";
import React from "react";
import { EmptyState } from "@/components/ui/emptyUI";
import TableSkeleton from "@/components/ui/tableComponent/tableSkeleton";
import { RiderDocsType, RidersType } from "@/types/riders";
import { OrderType } from "@/types/orders";
import TablePagination from "@/components/ui/tableComponent/tablePaginations";

export const RiderTable = () => {
  const { data, isPending, searchValue, filterValue } = usePaginationContext();

  const ridersData = data?.assets as RidersType[];

  if ((filterValue || searchValue) && ridersData?.length === 0) {
    return (
      <EmptyState
        title="No result"
        subTitle={` No result found for: ${searchValue || filterValue}`}
        className="min-h-[70vh]"
      />
    );
  }
  if (ridersData?.length === 0) {
    return (
      <EmptyState
        title={`No Riders Datas`}
        subTitle={`Riders datas will appear here when they are available`}
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
          title="All Riders"
          columns={ridersColData}
          data={data?.assets as RidersType[]}
          containerClassName="mt-6"
        />
      )}
    </>
  );
};

export const DocumentsTable = ({ data }: { data: RiderDocsType[] }) => {
  const ridersDocsData = data;

  if (ridersDocsData?.length === 0) {
    return (
      <EmptyState
        title={`No Documents`}
        subTitle={`Riders is yet to upload documents`}
        className="min-h-[70vh]"
      />
    );
  }

  return (
    <TableComponent
      title="Riders Documents"
      columns={riderDocsColData}
      data={data}
      containerClassName="mt-6"
    />
  );
};

export const RiderOrderTable = () => {
  const { data, isPending } = usePaginationContext();

  const customerData = data?.assets as OrderType[];

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
          columns={riderOrdersColData}
          data={data?.assets as OrderType[]}
          containerClassName="mt-6"
        />
      )}

      <TablePagination />
    </>
  );
};
