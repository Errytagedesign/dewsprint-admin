import {
  OrderByIdRsp,
  OrderResponse,
  OrderStatusType,
  ReassignOrderType,
  UpdateOrderStatusType,
} from "@/types/orders";
import { Api } from "./api";
import { queryBuilder } from "@/utils/helpers";
import { ApiResponse } from "@/types/auth";

export const getOrdersByType = ({
  status,
  page = "1",
  limit = "10",
  search,
  trackingCode,
}: {
  status: OrderStatusType;
  page?: string;
  limit?: string;
  search?: string;
  trackingCode?: string;
}) => {
  return Api.get<OrderResponse>(
    `/admin/orders?${queryBuilder({ page, limit, status, search: String(search), trackingCode: String(trackingCode) })}`,
    true,
  );
};

export const getOrdersById = (id: string) => {
  return Api.get<OrderByIdRsp>(`/orders/${id}`, true);
};

export const updateOrderStatusById = (
  orderId: string,
  body: UpdateOrderStatusType,
) => {
  return Api.patch<UpdateOrderStatusType, ApiResponse>(
    `/admin/orders/${orderId}/status`,
    body,
    true,
  );
};

export const reassignOrderByRiderId = (
  orderId: string,
  body: ReassignOrderType,
) => {
  return Api.post<ReassignOrderType, ApiResponse>(
    `/admin/orders/${orderId}/reassign`,
    body,
    true,
  );
};
