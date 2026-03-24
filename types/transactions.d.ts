import { ApiResponse } from "./auth.types";
import { Customer } from "./customers.types";
import { OrderType } from "./orders";
import { OrderProps } from "./orders.types";

export type TransactionStatusType =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | "CANCELED"
  | "REFUNDED";

export type TransactionType = {
  id: string;
  amount: number;
  type: string;
  status: string;
  purpose: string;
  provider: string;
  currency: string;
  reference: string;
  description: string;
  createdAt: string;
  user: UserDataTypes;
  rider: UserDataTypes;
  order: OrderType;
};

export type TransactionResponse = ApiResponse & {
  data: {
    transactions: TransactionType[];
    pagination: PaginationType;
  };
};
