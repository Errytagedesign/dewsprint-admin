import { useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debouncer } from "@/utils/helpers";

export default function useSearch() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const searchValue = searchParams.get("search")?.toString();
  const emailSearchValue = searchParams.get("emailSearch")?.toString();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  };

  const handleESearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("emailSearch", term);
    } else {
      params.delete("emailSearch");
    }

    startTransition(() => {
      replace(`${pathName}?${params.toString()}`);
    });
  };

  const debouncedSearch = debouncer(handleSearch, 350);
  const debouncedESearch = debouncer(handleESearch, 350);
  return {
    searchValue,
    handleSearch,
    debouncedSearch,
    isPending,
    emailSearchValue,
    debouncedESearch,
  };
}
