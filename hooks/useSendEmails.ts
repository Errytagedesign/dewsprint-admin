import { getAllUsers } from "@/services/apis/email.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import useSearch from "./use-search";

export type SelectedUsersType = {
  id: string;
  email: string;
};

export const useSendEmails = () => {
  const [toggle, setToggle] = useState(false);
  const { emailSearchValue, isPending } = useSearch();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useInfiniteQuery({
    queryKey: ["all-users", emailSearchValue],
    queryFn: ({ pageParam }) =>
      getAllUsers({ page: pageParam, search: emailSearchValue }),

    getNextPageParam: (lastPage) => {
      const currentPage = parseInt(String(lastPage?.data?.currentPage));
      const totalPages = lastPage?.data?.totalPages;

      return currentPage < Number(totalPages) ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  console.log("user>>", data);

  // Flatten all pages into a single array
  const usersData =
    data?.pages.flatMap((page) => page?.data?.users ?? []) ?? [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    toggle,
    setToggle,
    usersData,
    isLoading,
    isFetchingNextPage,
    loadMore,
    refetch,
    isRefetching,
    error,
    hasNextPage,
    isPending,
    data,
  };
};
