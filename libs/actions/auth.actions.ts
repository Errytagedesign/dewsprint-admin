"use server";

import {
  currentUserUpdatePasswordApi,
  forgotPasswordRequestApi,
  passwordResetApi,
  signinApi,
  verifyEmail,
} from "@/services/apis/auth.api";
import { logout, setCookie } from "@/services/session";
import {
  LoginTypes,
  ResetPasswordTypes,
  UpdatePasswordTypes,
  VerifyOTPTypes,
} from "@/types/auth";

import { ActionFormStatus } from "@/types/global";
import { revalidatePath } from "next/cache";

export const signInAction = async (_: ActionFormStatus, body: FormData) => {
  const rawData = {
    email: body.get("email"),
    password: body.get("password"),
  };

  try {
    const rsp = await signinApi(rawData as LoginTypes);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    const { tokens, user } = rsp?.body?.data;

    await setCookie({
      tokens,
      user,
    });

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

export const currentUserUpdatePasswordAction = async (
  body: UpdatePasswordTypes,
) => {
  try {
    const rsp = await currentUserUpdatePasswordApi(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    revalidatePath("/settings");

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const forgotPasswordRequestAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  try {
    const rsp = await forgotPasswordRequestApi({
      email: body.get("email") as string,
    });

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const verifyEmailAction = async (body: VerifyOTPTypes) => {
  try {
    const rsp = await verifyEmail(body);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Email verified successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const passwordResetAction = async (
  _: ActionFormStatus,
  body: FormData,
) => {
  const rawData = {
    resetToken: body.get("otp"),
    newPassword: body.get("newPassword"),
  };

  if (rawData?.newPassword !== body.get("confirmPassword")) {
    return {
      error: true,
      message: "Password does not match",
    };
  }

  try {
    const rsp = await passwordResetApi(rawData as ResetPasswordTypes);

    if (!rsp.ok) {
      return {
        error: true,
        message: rsp?.body?.message || "Something went wrong",
      };
    }

    return {
      error: false,
      message: rsp?.body?.message || "Password reset successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      error: true,
      message: "Something went wrong",
    };
  }
};

export const logoutAction = async () => {
  await logout();
};
