"use client";
import React, { useTransition } from "react";
import { RestrictIcon } from "@/public/svgs/svgs";
import { MdBlock } from "react-icons/md";
import Button from "@/components/ui/button";
import { useModalContext } from "@/context/modalContext";
import ModalWrapper from "@/components/ui/modals/ModalWrapper";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  blockCustomerAction,
  restrictCustomerAction,
  unBlockCustomerAction,
  unRestrictCustomerAction,
} from "@/libs/actions/customer.actions";
import { handleError, handleSuccess } from "@/utils/helpers";
import { User } from "@/types/customers.types";

const BlockUsers = ({ user }: { user: User }) => {
  const { openModal, closeModal, isOpen } = useModalContext();

  const [isPending, startTransition] = useTransition();

  const handleRestrict = () => {
    startTransition(async () => {
      const rsp = await restrictCustomerAction(user?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal("restrict");
      }
    });
  };

  const handleUnRestrict = () => {
    startTransition(async () => {
      const rsp = await unRestrictCustomerAction(user?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal("unrestrict");
      }
    });
  };

  const handleBlock = () => {
    startTransition(async () => {
      const rsp = await blockCustomerAction(user?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal("block");
      }
    });
  };

  const handleUnBlock = () => {
    startTransition(async () => {
      const rsp = await unBlockCustomerAction(user?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal("unblock");
      }
    });
  };

  return (
    <div className="flex flex-col">
      <article className="flex items-center gap-3">
        {user?.status?.toLowerCase() === "inactive" ? (
          <Button
            className="outline-btn"
            onClick={() => openModal("unrestrict")}
          >
            <RestrictIcon /> Unrestrict
          </Button>
        ) : (
          <Button className="outline-btn" onClick={() => openModal("restrict")}>
            <RestrictIcon /> Restrict
          </Button>
        )}
        {user?.status?.toLowerCase() === "blocked" ? (
          <Button
            className="outline-btn !text-error"
            onClick={() => openModal("unblock")}
          >
            <MdBlock /> Unblock
          </Button>
        ) : (
          <Button
            className="outline-btn !text-error"
            onClick={() => openModal("block")}
          >
            <MdBlock /> Block
          </Button>
        )}
      </article>

      {isOpen["restrict"] && (
        <ModalWrapper
          id="restrict"
          title={`Are you sure you want to Restrict ${user?.fullName}?`}
          titleClass="!text-lg !font-medium text-center !px-5"
        >
          <DialogFooter className="mt-7 !justify-center">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button
              className="pry-btn !bg-error"
              onClick={handleRestrict}
              loading={isPending}
            >
              Yes, Restrict
            </Button>
          </DialogFooter>
        </ModalWrapper>
      )}

      {isOpen["block"] && (
        <ModalWrapper
          id="block"
          title={`Are you sure you want to Block ${user?.fullName}?`}
          titleClass="!text-lg !font-medium text-center !px-5"
        >
          <DialogFooter className="mt-7 !justify-center">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button
              className="pry-btn !bg-error"
              onClick={handleBlock}
              loading={isPending}
            >
              Yes, Block
            </Button>
          </DialogFooter>
        </ModalWrapper>
      )}

      {isOpen["unrestrict"] && (
        <ModalWrapper
          id="unrestrict"
          title={`Are you sure you want to Restrict ${user?.fullName}?`}
          titleClass="!text-lg !font-medium text-center !px-5"
        >
          <DialogFooter className="mt-7 !justify-center">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button
              className="pry-btn !bg-error"
              onClick={handleUnRestrict}
              loading={isPending}
            >
              Yes, Unestrict
            </Button>
          </DialogFooter>
        </ModalWrapper>
      )}

      {isOpen["unblock"] && (
        <ModalWrapper
          id="unblock"
          title={`Are you sure you want to Unblock ${user?.fullName}}?`}
          titleClass="!text-lg !font-medium text-center !px-5"
        >
          <DialogFooter className="mt-7 !justify-center">
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <Button
              className="pry-btn !bg-error"
              onClick={handleUnBlock}
              loading={isPending}
            >
              Yes, Unblock
            </Button>
          </DialogFooter>
        </ModalWrapper>
      )}
    </div>
  );
};

export default BlockUsers;
