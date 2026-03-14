import { ApiResponse } from "./auth.types";
import { Customer } from "./customers.types";

export type SubscriptionProps = {
  id: string;
  type: string;
  plan: string;
  socialUsername: string;
  durationMonths: number;
  price: string;
  discountPercentage: string;
  discountedPrice: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  balance: string;
  customer: Customer;
};

export type SubscriptionRsp = ApiResponse & {
  data: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    subscriptions: SubscriptionProps[];
  };
};

export type SubscriptionStatusUpdateType = {
  subscriptionId: string;
  reason: string;
  approved: boolean;
};
