"use client";

import { usePaginationContext } from "@/context/paginateContext";
import React from "react";
import { BiSearch } from "react-icons/bi";

const Search = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  const { searchValue, debouncedSearch, isPending } = usePaginationContext();

  return (
    <article
      data-pending={isPending ? "true" : undefined}
      className={`flex w-full items-center gap-2 ${className} border-grey-200 rounded-full border pl-4`}
    >
      <BiSearch className="text-grey-300" />
      <input
        type="search"
        placeholder={placeholder}
        className="flex-1 !bg-transparent px-4 py-2 focus:outline-none"
        defaultValue={searchValue}
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </article>
  );
};

export default Search;
