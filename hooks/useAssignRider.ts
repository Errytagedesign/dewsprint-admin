import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import useSearch from "./use-search";
import { RidersResponse, RidersType } from "@/types/riders";

export type SelectedUsersType = {
  id: string;
  email: string;
};

type UseAssignRiderProps = {
  status?: string;
  limit?: string;
};

type AssignRiderListItem = {
  id: string;
  fullName: string;
  email: string;
  imageUrl: string;
};

async function getRiders({
  page,
  limit,
  search,
  status,
}: {
  page: number;
  limit?: string;
  search?: string;
  status?: string;
}) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  if (limit) params.set("limit", limit);
  if (search) params.set("search", search);
  if (status) params.set("status", status);

  const res = await fetch(`/api/riders?${params.toString()}`);
  const json = await res.json();

  if (!res.ok) {
    throw new Error(json?.message || "Failed to fetch riders");
  }

  return json as RidersResponse;
}

function mapRiderToListItem(rider: RidersType): AssignRiderListItem {
  return {
    id: rider.id,
    fullName: rider.name,
    email: rider.email,
    imageUrl: rider.profilePhotoUrl,
  };
}

export const useAssignRider = ({
  status,
  limit = "5",
}: UseAssignRiderProps = {}) => {
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
    queryKey: ["riders", status, limit, emailSearchValue],
    queryFn: ({ pageParam }) =>
      getRiders({
        page: pageParam,
        limit,
        status,
        search: emailSearchValue,
      }),

    getNextPageParam: (lastPage) => {
      const currentPage = lastPage?.data?.pagination?.page ?? 1;
      const totalPages = lastPage?.data?.pagination?.totalPages ?? 1;

      return currentPage < Number(totalPages) ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  // Flatten all pages into a single array
  const usersData =
    data?.pages
      .flatMap((page) => page?.data?.items ?? [])
      .map(mapRiderToListItem) ?? [];

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
