import { Api } from "./api";
import {
  GetAllUsers,
  GetEmailsRsp,
  GetPushNotificationRsp,
  SendEmailProps,
  SendPushProps,
} from "@/types/email.types";
import { ApiResponse } from "@/types/auth.types";

export const sendNewMailsApi = (body: SendEmailProps) => {
  return Api.post<SendEmailProps, ApiResponse>("/email/send", body, true);
};

export const getAllUsers = async ({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const rsp = await Api.get<GetAllUsers>(
    `/users/list?limit=${limit}&page=${page}${search ? `&search=${search}` : ""}`,
    true,
  );

  if (!rsp?.ok) {
    return {
      error: true,
      message: rsp?.body?.message,
    };
  }
  return {
    error: false,
    message: rsp?.body?.message,
    data: { ...rsp?.body },
  };
};

export const getAllEmails = ({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return Api.get<GetEmailsRsp>(
    `/email/list?limit=${limit}&page=${page}${search ? `&search=${search}` : ""}`,
    true,
  );
};

export const getAllPushNotifs = ({
  page = 1,
  limit = 10,
  search,
}: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return Api.get<GetPushNotificationRsp>(
    `/push-notifications/list?limit=${limit}&page=${page}${search ? `&search=${search}` : ""}`,
    true,
  );
};

export const sendNewPushApi = (body: SendPushProps) => {
  return Api.post<SendPushProps, ApiResponse>(
    "/push-notifications/bulk",
    body,
    true,
  );
};
