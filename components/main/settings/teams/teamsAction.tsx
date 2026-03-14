"use client";
import React, { useTransition } from "react";
import Button from "@/components/ui/button";
import { useModalContext } from "@/context/modalContext";
import ModalWrapper from "@/components/ui/modals/ModalWrapper";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { handleError, handleSuccess } from "@/utils/helpers";
import { deleteTeamMatesAction } from "@/libs/actions/settings.action";
import { UserData } from "@/types/auth.types";
import { BsTrash } from "react-icons/bs";

export const TeamsAction = ({ user }: { user: UserData }) => {
  const { openModal, closeModal, isOpen } = useModalContext();

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const rsp = await deleteTeamMatesAction(user?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`delete-${user?.id}`);
      }
    });
  };

  return (
    <>
      <Button
        className="pry-btn !bg-error"
        onClick={() => openModal(`delete-${user?.id}`)}
      >
        <BsTrash />
      </Button>

      {isOpen[`delete-${user?.id}`] && (
        <ModalWrapper
          id={`delete-${user?.id}`}
          title={`Are you sure you want to Delete this Admin`}
          titleClass="!text-lg !font-medium text-center !px-5"
        >
          <DialogFooter className="mt-7 !justify-center">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button
              className="pry-btn !bg-error"
              onClick={handleDelete}
              loading={isPending}
            >
              Yes, Delete
            </Button>
          </DialogFooter>
        </ModalWrapper>
      )}
    </>
  );
};
