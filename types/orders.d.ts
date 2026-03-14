import { ApiResponse } from "./auth.types";
import { Customer } from "./customers.types";
import { SubscriptionProps } from "./subscriptions.types";
import { ITransaction } from "./transactions.types";

export type OrderTypes =
  | "phone_number"
  | "sms_request"
  | "esim"
  | "boosts"
  | "gift_card"
  | "sms"
  | "airtime"
  | "subscriptions";

export type AllAssets = Order | ITransaction | SubscriptionProps;

export type OrdersSearchParams = {
  userId?: string;
  customerId?: string;
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

export type GiftCardCodesProps = { cardNumber: string; pin: string };

export type OrderProps = {
  id: string;
  type: string;
  status: string;
  amount: string;
  discount: number;
  providerOrderId: string;
  country: string;
  countryCode: string;
  countryInitial: string;
  providerResponse: null;
  providerTransactionId: string;
  link: string;
  description: string;
  productId: string;
  logoUrl: string;
  giftCardCodes: GiftCardCodesProps[];
  metadata: {
    name: string;
    category: string;
    type: string;
  } | null;
  created_date: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  service: string;
  phoneNumber: string;
  dataPlan: string;
  activationCode: string;
  coverage: string;
  validity: number;
  pin: string;
  puk: string;
  code: string | null;
  dataLeft: string;
  information: string;
  qrCode: string;
  serviceDetails: string;
  quantity: number;
  recipientEmail: string;
  recipientName: string;
  operatorLogoUrl: string;
  recipientPhone: string;
  operatorName: string;
  balance: string;
};

export type Order = OrderProps & {
  customer: Customer;
  transaction: Transaction;
  subscription: SubscriptionProps;
};

export type OrderResponse = ApiResponse & {
  data: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    orders: Order[];
  };
};

export type OrderByIdRsp = ApiResponse & {
  oreder: Order;
};
