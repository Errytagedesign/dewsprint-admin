"use client";
import React from "react";
import Sidebar from "./sidebar";
import { useModalContext } from "@/context/modalContext";

export default function RenderSidebar() {
  const { toggle } = useModalContext();
  return (
    <>
      <aside className="fixed top-2 left-2 hidden h-[98%] w-[18%] rounded-2xl bg-white lg:flex">
        <Sidebar />
      </aside>
      <aside className={toggle ? "openSidebar" : "closeSidebar"}>
        <Sidebar />
      </aside>
    </>
  );
}
