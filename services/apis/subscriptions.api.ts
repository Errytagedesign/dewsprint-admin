import {
  SubscriptionRsp,
  SubscriptionStatusUpdateType,
} from "@/types/subscriptions.types";
import { Api } from "./api";
import { ApiResponse } from "@/types/auth.types";

export const getAllSubscriptions = ({
  type,
  page = 1,
  limit = 10,
  search,
}: {
  type?: "x" | "telegram" | "snapchat";
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return Api.get<SubscriptionRsp>(
    `/subscriptions?page=${page}&limit=${limit}${type ? `&type=${type}` : ""}${search ? `&search=${search}` : ""}`,
    true,
  );
};

export const updateSubscriptionStatusApi = (
  body: SubscriptionStatusUpdateType,
) => {
  return Api.post<SubscriptionStatusUpdateType, ApiResponse>(
    `/subscriptions/approve`,
    body,
    true,
  );
};
