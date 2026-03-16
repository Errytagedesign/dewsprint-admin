"use client";

import React from "react";
import Button from "./ui/button";
import { LuMoveUpRight } from "react-icons/lu";
import Search from "./ui/search";
import { usePaginationContext } from "@/context/paginateContext";
import { SelectInput } from "./ui/select/SelectInput";

const PageHeader = ({ title }: { title: string }) => {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-6">
      <h4 className="text-grey-800 !text-lg !font-medium">{title}</h4>

      <article className="flex w-full flex-1 flex-wrap items-center justify-normal gap-2 lg:justify-end">
        <Search placeholder="Search" className="!max-w-xs" />
        <div className="w-fit">
          <FilterByStatus />
        </div>
        <Button className="outline-btn !text-grey-400 !min-h-auto !w-fit !px-3 !py-2 !font-normal">
          <LuMoveUpRight size={10} /> Export{" "}
        </Button>
      </article>
    </section>
  );
};

export default PageHeader;

const filterData = [
  { title: "All", value: "all" },
  { title: "Active", value: "active" },
  { title: "Inactive", value: "inactive" },
  { title: "Suspended", value: "suspended" },
];

const FilterByStatus = () => {
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
