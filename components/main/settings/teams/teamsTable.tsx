"use client";
import TableLoading from "@/components/ui/skeleton/tableLoading";
import TableComponent from "@/components/ui/tableComponent/tableComponent";
import { usePaginationContext } from "@/context/paginateContext";
import { UserData } from "@/types/auth.types";
import { teamsColData } from "@/utils/constants";
import React from "react";

export const TeamsTable = () => {
  const { data, isPending } = usePaginationContext();

  return (
    <>
      {isPending ? (
        <TableLoading />
      ) : (
        <TableComponent
          title="All Teams"
          columns={teamsColData}
          data={data?.assets as UserData[]}
          containerClassName="mt-6"
        />
      )}
    </>
  );
};
