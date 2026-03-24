import Button from "@/components/ui/button";
import { ModalWrappers } from "@/components/ui/modals/modalWrappers";
import PopoverWrapper from "@/components/ui/popover/popoverWrapper";
import { SelectInput } from "@/components/ui/select/SelectInput";
import { useModalContext } from "@/context/modalContext";
import { OrderStatusType, OrderType } from "@/types/orders";
import { handleError, handleSuccess } from "@/utils/helpers";
import React, { useState, useTransition } from "react";
import { IoIosMore } from "react-icons/io";
import { filterData } from "./ordersLayout";
import { DialogClose, DialogFooter } from "@/components/ui/modals/dialog";
import {
  reassignOrderByRiderIdAction,
  updateOrderStatusByIdAction,
} from "@/libs/actions/order.actions";
import { AssignRiderList } from "./assignRider";
import { UserDataTypes } from "@/types/auth";

export const OrdersAction = ({ data }: { data: OrderType }) => {
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

            <DialogFooter className="!grid grid-cols-1 gap-3 md:grid-cols-2">
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

      {isOpen[`reassign-${data?.id}`] && (
        <ModalWrappers
          id={`reassign-${data?.id}`}
          title="Re-assign Order"
          subtitle="Are you sure you want to re-assign this order?"
        >
          <div className="space-y-4">
            <AssignRiderList
              selectedRider={rider}
              handleSelectUsers={setRider}
            />

            <textarea
              name="reason"
              id="reason"
              className="form-controls"
              value={reason}
              placeholder="Enter re-assign reasons"
              rows={4}
              onChange={(e) => setReason(e.target.value)}
            />

            <DialogFooter className="!grid grid-cols-1 gap-3 md:grid-cols-2">
              <DialogClose asChild>
                <Button className="outline-btn">Cancel</Button>
              </DialogClose>
              <Button
                className="pry-btn"
                onClick={handleReassignOrder}
                loading={isPending}
              >
                Submit
              </Button>
            </DialogFooter>
          </div>
        </ModalWrappers>
      )}
    </>
  );
};
