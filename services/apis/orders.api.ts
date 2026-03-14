import { OrderByIdRsp, OrderResponse, OrderTypes } from "@/types/orders.types";
import { Api } from "./api";
import { SubscriptionRsp } from "@/types/subscriptions.types";

export const getOrdersByType = ({
  type,
  page = 1,
  limit = 10,
  search,
}: {
  type: OrderTypes;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return Api.get<OrderResponse>(
    `/orders?type=${type}&page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
    true,
  );
};

export const getOrdersById = (id: string) => {
  return Api.get<OrderByIdRsp>(`/orders/${id}`, true);
};
