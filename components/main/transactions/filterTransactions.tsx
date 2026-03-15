"use client";
import { SelectInput } from "@/components/ui/select/SelectInput";
import { usePaginationContext } from "@/context/paginateContext";
import React from "react";

const filterData = [
  { title: "All", value: "all" },
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" },
  { title: "Suspended", value: "suspended" },
];
const FilterTransactions = () => {
  const { filterValue, handleFilterUrl } = usePaginationContext();

  return (
    <SelectInput
      name="status"
      placeholder="Select"
      options={filterData}
      keyPropertyName="title"
      valuePropertyName="value"
      itemPropertyName="title"
      selected={filterValue || ""}
      onChange={(e) => handleFilterUrl(e)}
      className="!h-[38px] !w-full min-w-40 !rounded-lg !px-3 !py-2"
    />
  );
};

export default FilterTransactions;
