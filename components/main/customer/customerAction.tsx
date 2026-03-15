import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { useModalContext } from "@/context/modalContext";
import {
  suspendCustomersAction,
  unsuspendCustomerAction,
} from "@/libs/actions/customer.actions";
import { CustomerType } from "@/types/customers";
import { handleError, handleSuccess } from "@/utils/helpers";
import React, { useTransition } from "react";
import { BsEye } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { LuUserCheck, LuUserX } from "react-icons/lu";

export const CustomerAction = ({ data }: { data: CustomerType }) => {
  const [isPending, startTransition] = useTransition();

  const { isOpen, openModal, closeModal } = useModalContext();

  const isSuspended = data?.status?.toLowerCase() === "active";

  const handleSuspendRider = () => {
    startTransition(async () => {
      const rsp = await suspendCustomersAction(data?.id);

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
      const rsp = await unsuspendCustomerAction(data?.id);

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
