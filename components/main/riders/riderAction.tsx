"use client";

import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import { ModalWrappers } from "@/components/ui/modals/modalWrappers";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { useModalContext } from "@/context/modalContext";
import {
  reviewRidersDocsAction,
  suspendRidersAction,
  unsuspendRidersAction,
} from "@/libs/actions/rider.actions";
import { RiderDocsType, RidersType } from "@/types/riders";
import { handleError, handleSuccess } from "@/utils/helpers";
import React, { SyntheticEvent, useState, useTransition } from "react";
import { BsEye } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { LuUserCheck, LuUserX } from "react-icons/lu";

export const RiderAction = ({ data }: { data: RidersType }) => {
  const [isPending, startTransition] = useTransition();

  const { isOpen, openModal, closeModal } = useModalContext();

  const isSuspended = data?.status?.toLowerCase() === "active";

  const handleSuspendRider = () => {
    startTransition(async () => {
      const rsp = await suspendRidersAction(data?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`suspend-${data?.id}`);
      }
    });
  };

  const handleUnsuspendRider = () => {
    startTransition(async () => {
      const rsp = await unsuspendRidersAction(data?.id);

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`reinstate-${data?.id}`);
      }
    });
  };

  return (
    <>
      <PopoverWrapper icon={<IoIosMore />} align="end" className="!w-fit">
        <ul className="space-y-3">
          <li>
            <Button
              link
              href={`/riders/${data?.name}?id=${data?.id}`}
              className="sec-btn w-full !px-3 !py-2"
            >
              <BsEye /> View
            </Button>
          </li>
          <li>
            {isSuspended ? (
              <Button
                className="delete-btn w-full !px-3 !py-2"
                onClick={() => openModal(`suspend-${data?.id}`)}
              >
                <LuUserX /> Suspend
              </Button>
            ) : (
              <Button
                className="pry-btn w-full !px-3 !py-2"
                onClick={() => openModal(`reinstate-${data?.id}`)}
              >
                <LuUserCheck /> Reinstate
              </Button>
            )}
          </li>
        </ul>
      </PopoverWrapper>

      {isOpen[`suspend-${data?.id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`suspend-${data?.id}`}
          title="Suspend Rider"
          subTitle="Are you sure you want to suspend this rider?"
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Suspend"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleSuspendRider}
          loading={isPending}
        />
      )}

      {isOpen[`reinstate-${data?.id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`reinstate-${data?.id}`}
          title="Reinstate Rider"
          subTitle="Are you sure you want to reinstate this rider?"
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Reinstate"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleUnsuspendRider}
          loading={isPending}
        />
      )}
    </>
  );
};

export const RiderDocsAction = ({ data }: { data: RiderDocsType }) => {
  const [isPending, startTransition] = useTransition();
  const [reason, setReason] = useState("");

  const { isOpen, openModal, closeModal } = useModalContext();

  const isApproved = data?.status?.toLowerCase() === "approved";

  const handleApproveDocs = () => {
    startTransition(async () => {
      const rsp = await reviewRidersDocsAction(data?.id, {
        status: "APPROVED",
      });

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`approve-${data?.id}`);
      }
    });
  };

  const handleRejectDocs = (e: SyntheticEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const rsp = await reviewRidersDocsAction(data?.id, {
        status: "REJECTED",
        rejectionReason: reason,
      });

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`reject-${data?.id}`);
      }
    });
  };

  return (
    <>
      <PopoverWrapper icon={<IoIosMore />} align="end" className="!w-fit">
        <ul className="space-y-3">
          <li>
            <a
              href={data?.documentUrl}
              target="_blank"
              rel="noreferrer"
              className="sec-btn btn w-full !px-3 !py-2"
            >
              <BsEye /> View
            </a>
          </li>

          {!isApproved && (
            <>
              <li>
                <Button
                  className="pry-btn w-full !px-3 !py-2"
                  onClick={() => openModal(`approve-${data?.id}`)}
                >
                  Approve
                </Button>
              </li>
              <li>
                <Button
                  className="delete-btn w-full !px-3 !py-2"
                  onClick={() => openModal(`reject-${data?.id}`)}
                >
                  Reject
                </Button>
              </li>
            </>
          )}
        </ul>
      </PopoverWrapper>

      {isOpen[`approve-${data?.id}`] && (
        <ActionModals
          icon={<WarningIcon />}
          id={`approve-${data?.id}`}
          title="Approve Document"
          subTitle="Are you sure you want to approve this document?"
          subtitleClass="text-grey-300!"
          actionTitle="Yes, Approve"
          closeTitle="No, Cancel"
          btnSecClass="outline-btn"
          action={handleApproveDocs}
          loading={isPending}
        />
      )}

      {isOpen[`reject-${data?.id}`] && (
        <ModalWrappers
          icon={<WarningIcon />}
          id={`reject-${data?.id}`}
          title="Reject Document"
          subtitle="Are you sure you want to reject this document?"
          subtitleClass="text-grey-500!"
          headerClass="text-center!"
        >
          <form onSubmit={handleRejectDocs}>
            <textarea
              id="reason"
              name="reason"
              placeholder="Enter reject reason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-controls"
              required
            />
            <DialogFooter className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-2">
              <DialogClose asChild>
                <Button type="button" className="outline-btn">
                  No, Cancel
                </Button>
              </DialogClose>

              <Button className="pry-btn" type="submit" loading={isPending}>
                Yes, Reject
              </Button>
            </DialogFooter>
          </form>
        </ModalWrappers>
      )}
    </>
  );
};
