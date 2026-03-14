"use server";

import {
  addTeamMatesApi,
  deleteTeamMatesApi,
  updateCurrentUserApi,
} from "@/services/apis/settings.api";
import { ActionFormStatus } from "@/types/global.types";
import { AddTeamMatesProps } from "@/types/settings.types";
import { revalidatePath } from "next/cache";

export const updateCurrentUserAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  // Remove 'file' if it's empty or not a File
  const file = body.get("file");
  if (
    !(file instanceof File) ||
    file.name === "" ||
    file.name === undefined ||
    file.size === 0
  ) {
    body.delete("file");
  }

  const rsp = await updateCurrentUserApi(body);

  try {
    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }
    revalidatePath("/settings");
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

export const addTeamMatesAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  const rawData = {
    firstName: body?.get("firstName"),
    lastName: body?.get("lastName"),
    email: body?.get("email"),
    role: body?.get("role"),
  };
  const rsp = await addTeamMatesApi(rawData as AddTeamMatesProps);

  try {
    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }
    revalidatePath("/settings");
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

export const deleteTeamMatesAction = async (id: string) => {
  const rsp = await deleteTeamMatesApi(id);

  try {
    if (!rsp?.ok) {
      return {
        error: true,
        message: rsp?.body?.message,
      };
    }
    revalidatePath("/settings");
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
