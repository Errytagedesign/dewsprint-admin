"use client";

import React from "react";
import LogoutBtn from "./logoutBtn";
import { LogOutIcon, OutIcon } from "@/public/svgs/svgs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useModal } from "@/hooks/useModal";
import Button from "../ui/button";

const Logout = () => {
  const { isOpen, closeModal, openModal } = useModal();

  return (
    <>
      <button
        className="sidebarNotActive flex cursor-pointer items-center gap-2"
        onClick={() => openModal("logout")}
      >
        <LogOutIcon />
        <span className="text-error !text-sm font-semibold"> Logout</span>
      </button>
      <Dialog
        open={isOpen["logout"]}
        onOpenChange={(isOpen) => !isOpen && closeModal("logout")}
      >
        <DialogContent className="space-y-3 bg-white sm:max-w-[402px]">
          <div className="mt-10 flex justify-center">
            <OutIcon />
          </div>
          <DialogHeader className="items-center text-center">
            <DialogTitle className="!text-xl font-bold lg:!text-2xl">
              Log Out?{" "}
            </DialogTitle>
            <DialogDescription className="!mt-3">
              Are you sure you want to logout?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <article className="flex items-center justify-end gap-5 pb-6">
              <DialogClose asChild>
                <Button type="button" className="">
                  Cancel
                </Button>
              </DialogClose>
              <LogoutBtn />
            </article>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Logout;
