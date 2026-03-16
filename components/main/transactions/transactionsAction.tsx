import { WarningIcon } from "@/components/logout/logout";
import Button from "@/components/ui/button";
import ActionModals from "@/components/ui/modals/actionModals";
import { ModalWrappers } from "@/components/ui/modals/modalWrappers";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { SelectInput } from "@/components/ui/select/SelectInput";
import { useModalContext } from "@/context/modalContext";
import {
  suspendCustomersAction,
  unsuspendCustomerAction,
} from "@/libs/actions/customer.actions";
import { OrderStatusType, OrderType } from "@/types/orders";
import { handleError, handleSuccess } from "@/utils/helpers";
import React, { useState, useTransition } from "react";
import { IoIosMore } from "react-icons/io";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import {
  reassignOrderByRiderIdAction,
  updateOrderStatusByIdAction,
} from "@/libs/actions/order.actions";
import { UserDataTypes } from "@/types/auth";

export const TransactionsAction = ({ data }: { data: OrderType }) => {
  const [isPending, startTransition] = useTransition();
  const { isOpen, openModal, closeModal } = useModalContext();

  const [status, setStatus] = useState(data?.status);
  const [reason, setReason] = useState("");
  const [rider, setRider] = useState<Partial<UserDataTypes>>({
    id: data?.rider?.id,
    name: data?.rider?.name,
  });

  const isDisabled = data?.status?.toLowerCase() === "completed";

  const handleOrderStatusUpdate = () => {
    startTransition(async () => {
      const rsp = await updateOrderStatusByIdAction(data?.id, {
        status: status as OrderStatusType,
      });

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`status-${data?.id}`);
      }
    });
  };

  const handleReassignOrder = () => {
    startTransition(async () => {
      const rsp = await reassignOrderByRiderIdAction(data?.id, {
        riderId: rider?.id as string,
        reason,
      });

      if (rsp?.error) {
        handleError(rsp?.message);
      } else {
        handleSuccess(rsp?.message);
        closeModal(`reassign-${data?.id}`);
      }
    });
  };

  return (
    <>
      <PopoverWrapper icon={<IoIosMore />} align="end" className="!w-fit">
        <ul className="space-y-3">
          <li>
            <Button
              className="sec-btn w-full !px-3 !py-2"
              onClick={() => openModal(`status-${data?.id}`)}
              disabled={isDisabled}
            >
              Update Status
            </Button>
          </li>
          <li>
            <Button
              className="pry-btn w-full !px-3 !py-2"
              onClick={() => openModal(`reassign-${data?.id}`)}
              disabled={isDisabled}
            >
              Re-assign Rider
            </Button>
          </li>
        </ul>
      </PopoverWrapper>
    </>
  );
};
