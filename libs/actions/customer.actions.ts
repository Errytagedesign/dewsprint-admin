"use server";

import {
  blockCustomerApi,
  deductUserBalanceApi,
  fundUserWalletApi,
  restrictCustomerApi,
  unBlockCustomerApi,
  unRestrictCustomerApi,
} from "@/services/apis/customers.api";
import { updateSubscriptionStatusApi } from "@/services/apis/subscriptions.api";
import { FundWalletTypes } from "@/types/customers.types";
import { SubscriptionStatusUpdateType } from "@/types/subscriptions.types";
import { revalidatePath } from "next/cache";

export const restrictCustomerAction = async (userId: string) => {
  try {
    const rsp = await restrictCustomerApi(userId);
    console.log("action>>", rsp);
    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const blockCustomerAction = async (userId: string) => {
  try {
    const rsp = await blockCustomerApi(userId);
    console.log("action>>", rsp);
    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const unRestrictCustomerAction = async (userId: string) => {
  try {
    const rsp = await unRestrictCustomerApi(userId);
    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const unBlockCustomerAction = async (userId: string) => {
  try {
    const rsp = await unBlockCustomerApi(userId);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const fundUserWalletAction = async (body: FundWalletTypes) => {
  try {
    const rsp = await fundUserWalletApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const deductUserBalanceAction = async (body: FundWalletTypes) => {
  try {
    const rsp = await deductUserBalanceApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/customers/");

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

export const updateSubscriptionStatusAction = async (
  body: SubscriptionStatusUpdateType,
) => {
  try {
    const rsp = await updateSubscriptionStatusApi(body);
    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/subscriptions");

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
