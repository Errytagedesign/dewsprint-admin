import { UserDataTypes } from "./auth";
import { ApiResponse } from "./auth.types";
import { Customer } from "./customers.types";
import { PaginationType } from "./global";
import { SubscriptionProps } from "./subscriptions.types";
import { ITransaction } from "./transactions.types";

export type OrderStatusType =
  | "PENDING"
  | "ASSIGNED"
  | "ACCEPTED"
  | "ARRIVED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatusType = "PENDING" | "PAID" | "REFUNDED" | "FAILED";

export type OrdersSearchParams = {
  id?: string;
  page: string;
  search: string;
  status: string;
};

export type Transaction = {
  id: string;
  status: string;
  amount: string;
  fee: string;
  balance: string;
  from: null;
  to: null;
  localAmount: string;
  rate: string;
  reference: string;
  direction: string;
  description: string;
  type: string;
  method: null;
  created_date: string;
  updated_date: string;
};

export type OrderType = {
  id: string;
  city: { id: string; name: string };
  trackingCode: string;
  status: string;
  paymentStatus: PaymentStatusType;
  paymentMethod: string;
  user: UserDataTypes;
  rider: UserDataTypes;
  totalFee: number;
  createdAt: string;
  distanceKm: number;
  deliveryFee: number;
  declaredValue: number;
  serviceFee: number;
  insuranceFee: number;
  totalFee: number;
};

export type OrderResponse = ApiResponse & {
  data: {
    orders: OrderType[];
    pagination: PaginationType;
  };
};

export type OrderByIdRsp = ApiResponse & {
  data: { oreder: OrderType };
};

export type UpdateOrderStatusType = { status: OrderStatusType };

export type ReassignOrderType = {
  riderId: string;
  reason: string;
};
