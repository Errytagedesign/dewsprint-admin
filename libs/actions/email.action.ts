"use server";

import { sendNewMailsApi, sendNewPushApi } from "@/services/apis/email.api";
import { SendEmailProps, SendPushProps } from "@/types/email.types";
import { revalidatePath } from "next/cache";

export const sendNewMailsAction = async (body: SendEmailProps) => {
  const rsp = await sendNewMailsApi(body);
  try {
    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }
    revalidatePath("/emails");
    return {
      error: false,
      message: rsp?.body?.message,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const sendNewPushAction = async (body: SendPushProps) => {
  const rsp = await sendNewPushApi(body);

  try {
    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }
    revalidatePath("/emails");
    return {
      error: false,
      message: rsp?.body?.message,
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};
