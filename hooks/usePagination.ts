import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debouncer } from "@/utils/helpers";
import { AllAssets } from "@/types/orders";

export type UsePaginateData = {
  total: number;
  limit: number;
  totalPages: number;
  assets: AllAssets;
};

export default function usePagination(data?: UsePaginateData) {
  const pathName = usePathname();

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchValue = searchParams.get("search")?.toString();
  const filterValue = searchParams.get("status")?.toString();

  const currentPage = Number(searchParams.get("page") || "1");
  const totalPages = data?.totalPages || 0;
  const pageSize = data?.limit || 0;
  const totalCount = data?.total || 0;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathName}?${params.toString()}`;
  };

  const createPageLimitURL = (pageLimit: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("limit", pageLimit.toString());
    return `${pathName}?${params.toString()}`;
  };

  const setPageLimit = (pageLimit: number | string) => {
    const pageUrl = createPageLimitURL(pageLimit);
    startTransition(() => {
      replace(pageUrl);
    });
  };

  const createSearchURL = (key: string, query: string) => {
    const params = new URLSearchParams(searchParams);

    if (query !== "") {
      params.set(key, query);
    } else {
      params.delete(key);
    }
    return `${pathName}?${params.toString()}`;
  };

  const handleSearchUrl = (query: string) => {
    const currentSearch = searchParams.get("search") || "";

    if (query !== currentSearch) {
      // Only update if the query has changed
      const pageUrl = createSearchURL("search", query);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const handleFilterUrl = (query: string) => {
    const currentSearch = searchParams.get("filter") || "";

    if (query !== currentSearch) {
      // Only update if the query has changed
      const pageUrl = createSearchURL("filter", query);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const handlePageUrl = (pageNumber: number) => {
    const pageUrl = createPageURL(pageNumber);
    startTransition(() => {
      replace(pageUrl);
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const pageUrl = createPageURL(prevPage);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      const prevPage = currentPage + 1;
      const pageUrl = createPageURL(prevPage);
      startTransition(() => {
        replace(pageUrl);
      });
    }
  };

  const goToPageNumber = (pageNumber: number) => {
    if (pageNumber <= totalPages && currentPage !== pageNumber) {
      const pageURl = createPageURL(pageNumber);
      startTransition(() => {
        replace(pageURl);
      });
    }
  };

  const debouncedSearch = debouncer(handleSearchUrl, 350);

  const previousBtnState = currentPage === 1;
  const nextBtnState = currentPage === totalPages;

  return {
    currentPage,
    totalPages,
    pageSize,
    totalCount,
    handlePrev,
    handleNext,
    goToPageNumber,
    previousBtnState,
    nextBtnState,
    isPending,
    setPageLimit,
    handlePageUrl,
    handleSearchUrl,
    data,
    debouncedSearch,
    searchValue,
    handleFilterUrl,
    filterValue,
  };
}
