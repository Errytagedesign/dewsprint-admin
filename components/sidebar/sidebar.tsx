"use client";
import { SidebarData } from "./sidebarData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "../ui/brandLogo";
import { useModalContext } from "@/context/modalContext";

const Sidebar = () => {
  const currentPath = usePathname();
  const { setToggle } = useModalContext();

  return (
    <section className="w-full px-3 pb-10">
      <article className="flex pt-3 pl-[1.5em]">
        <BrandLogo className="h-[33.7px] w-[158px]" />
      </article>
      <article className="mt-8 flex h-[80vh] flex-col gap-4 overflow-y-auto">
        {SidebarData.map(({ url, icon, title }, idx) => (
          <Link
            key={idx}
            href={url}
            className={
              currentPath.includes(url) ? "sidebarActive" : "sidebarNotActive"
            }
            onClick={() => setToggle(false)}
          >
            <span className="flex items-center gap-2 text-sm">
              {icon}
              {title}
            </span>
          </Link>
        ))}
      </article>
    </section>
  );
};

export default Sidebar;
