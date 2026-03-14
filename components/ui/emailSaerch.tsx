"use client";

import useSearch from "@/hooks/use-search";
import React from "react";
import { BiSearch } from "react-icons/bi";

const EmailSaerch = ({
  placeholder,
  className,
}: {
  placeholder: string;
  className?: string;
}) => {
  const { emailSearchValue, debouncedESearch, isPending } = useSearch();

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
        defaultValue={emailSearchValue}
        onChange={(e) => debouncedESearch(e.target.value)}
      />
    </article>
  );
};

export default EmailSaerch;
