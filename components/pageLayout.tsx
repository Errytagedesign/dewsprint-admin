import React, { ReactNode } from "react";
import { PaginationProvider } from "@/context/paginateContext";
import { UsePaginateData } from "@/hooks/usePagination";
import PageHeader from "@/components/pageHeader";
import TablePagination from "@/components/ui/tableComponent/tablePaginations";

type OrdersLayout = {
  data?: UsePaginateData;
  pageTitle: string;
  recent?: boolean;
  children: ReactNode;
};

export default function PageLayout({
  data,
  pageTitle,
  children,
  recent,
}: OrdersLayout) {
  return (
    <PaginationProvider data={data as UsePaginateData}>
      <main className={`space-y-3 pb-20`}>
        {!recent && <PageHeader title={pageTitle} />}

        {children}
        <TablePagination />
      </main>
    </PaginationProvider>
  );
}
