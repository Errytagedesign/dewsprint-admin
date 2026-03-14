import { ReactNode } from "react";

import TopBar from "../topbar/topbar";
import RenderSidebar from "./renderSidebar";

export default function MainPageLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-wrap justify-end p-2">
      <RenderSidebar />
      <article className="w-full space-y-2 lg:w-[81%]">
        <TopBar />
        <div className="custom-scrollbar h-[calc(100vh-var(--main-header-height))] w-full overflow-y-auto">
          {children}
        </div>
      </article>
    </main>
  );
}
