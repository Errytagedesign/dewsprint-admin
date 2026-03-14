import {
  ApiResponse,
  AuthResponse,
  LoginTypes,
  ResetPasswordTypes,
  UpdatePasswordTypes,
  UserDataTypes,
  VerifyOTPResponse,
  VerifyOTPTypes,
} from "@/types/auth";

import { Api } from "./api";

export const signinApi = (body: LoginTypes) => {
  return Api.post<LoginTypes, AuthResponse>("/auth/login", body);
};

export const getCurrentUserApi = () => {
  return Api.get<ApiResponse & { user: UserDataTypes }>(
    `/users/admin/profile`,
    true,
  );
};

export const verifyEmail = (body: VerifyOTPTypes) => {
  return Api.post<VerifyOTPTypes, VerifyOTPResponse>("/auth/otp/verify", body);
};

export const currentUserUpdatePasswordApi = (body: UpdatePasswordTypes) => {
  return Api.post<UpdatePasswordTypes, AuthResponse>(
    `/users/change-password`,
    body,
    true,
  );
};

export const forgotPasswordRequestApi = (body: { email: string }) => {
  return Api.post<{ email: string }, AuthResponse>(
    `/users/request-password-reset`,
    body,
  );
};

export const passwordResetApi = (body: ResetPasswordTypes) => {
  return Api.post<ResetPasswordTypes, AuthResponse>(
    `/users/reset-password`,
    body,
  );
};

export const resendOTP = (body: { email: string }) => {
  return Api.post<{ email: string }, VerifyOTPResponse>(
    `/auth/otp/generate`,
    body,
  );
};
