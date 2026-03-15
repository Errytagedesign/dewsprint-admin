"use server";

import {
  deleteRidersApi,
  suspendRidersApi,
  unsuspendRidersApi,
} from "@/services/apis/riders.api";
import { revalidatePath } from "next/cache";

export const deleteRidersAction = async (userId: string) => {
  try {
    const rsp = await deleteRidersApi(userId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/riders");

    return {
      error: false,
      message: rsp?.body?.message || "User deleted in successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const suspendRidersAction = async (userId: string) => {
  try {
    const rsp = await suspendRidersApi(userId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/riders");

    return {
      error: false,
      message: rsp?.body?.message || "User logged in successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const unsuspendRidersAction = async (userId: string) => {
  try {
    const rsp = await unsuspendRidersApi(userId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/riders");

    return {
      error: false,
      message: rsp?.body?.message || "User logged in successfully",
      data: rsp?.body?.data,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
