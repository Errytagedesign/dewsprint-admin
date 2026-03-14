import { FC, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/libs/utils";

export type PageTabsParams = {
  activeClass: string;
  notActiveClass?: string;
  searchParams: { tab: string };
  defaultTab: string;
  path: string;
  tabDatas: {
    id: string;
    title: string;
    totalCount?: number;
  }[];
  className?: string;
  containerClassName?: string;
  pageContent?: ReactNode;
  placeholder?: string;
  tabClassName?: string;
};

const PageTabs: FC<PageTabsParams> = ({
  tabDatas,
  searchParams,
  defaultTab,
  path,
  className,
  containerClassName,
  activeClass,
  pageContent,
  notActiveClass,
  tabClassName,
}) => {
  const activeTab = searchParams.tab || defaultTab;

  return (
    <>
      <header className={cn("flex items-center justify-between", tabClassName)}>
        <ul
          className={`${className} flex justify-normal gap-4 overflow-x-auto whitespace-nowrap`}
        >
          {tabDatas?.map(({ id, title }) => (
            <Link
              href={`${path}?tab=${id}`}
              key={id}
              className={` ${activeTab === id ? activeClass : notActiveClass} group text-grey-400 hover:bg-primary-50 hover:text-primary gap-2 !rounded-xl px-6 py-2 transition-all duration-300`}
            >
              {title}{" "}
            </Link>
          ))}
        </ul>
      </header>

      <aside className={containerClassName}>{pageContent}</aside>
    </>
  );
};

export default PageTabs;
