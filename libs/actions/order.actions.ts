"use server";

import {
  reassignOrderByRiderId,
  updateOrderStatusById,
} from "@/services/apis/orders.api";
import { ReassignOrderType, UpdateOrderStatusType } from "@/types/orders";

import { revalidatePath } from "next/cache";

export const reassignOrderByRiderIdAction = async (
  orderId: string,
  body: ReassignOrderType,
) => {
  try {
    const rsp = await reassignOrderByRiderId(orderId, body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/orders");

    return {
      error: false,
      message: rsp?.body?.message || "User logged in successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const updateOrderStatusByIdAction = async (
  orderId: string,
  body: UpdateOrderStatusType,
) => {
  try {
    const rsp = await updateOrderStatusById(orderId, body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/orders");

    return {
      error: false,
      message: rsp?.body?.message || "User logged in successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
