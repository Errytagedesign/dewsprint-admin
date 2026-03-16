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
import { filterData } from "./ordersLayout";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import { updateOrderStatusByIdAction } from "@/libs/actions/order.actions";

export const OrdersAction = ({ data }: { data: OrderType }) => {
  const [status, setStatus] = useState(data?.status);
  const [isPending, startTransition] = useTransition();

  const { isOpen, openModal, closeModal } = useModalContext();

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
              onClick={() => openModal(`reinstate-${data?.id}`)}
              disabled={isDisabled}
            >
              Re-assign Rider
            </Button>
          </li>
        </ul>
      </PopoverWrapper>

      {isOpen[`status-${data?.id}`] && (
        <ModalWrappers
          id={`status-${data?.id}`}
          title="Change Order Status"
          subtitle="Are you sure you want to change this order status?"
        >
          <div className="space-y-4">
            <SelectInput
              name="status"
              placeholder="Order Status"
              options={filterData}
              keyPropertyName="title"
              valuePropertyName="value"
              itemPropertyName="title"
              selected={status}
              onChange={(e) => setStatus(e)}
              className="!h-[38px] !w-full min-w-40 !rounded-lg !px-3 !py-2"
            />

            <DialogFooter className="!justify-between">
              <DialogClose asChild>
                <Button className="outline-btn">Cancel</Button>
              </DialogClose>
              <Button
                className="pry-btn"
                onClick={handleOrderStatusUpdate}
                loading={isPending}
              >
                Change Status
              </Button>
            </DialogFooter>
          </div>
        </ModalWrappers>
      )}
    </>
  );
};
