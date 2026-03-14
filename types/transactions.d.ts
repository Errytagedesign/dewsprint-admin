import { ApiResponse } from "./auth.types";
import { Customer } from "./customers.types";
import { OrderProps } from "./orders.types";

export type TransactionType =
  | "Rent Number"
  | "SMS request"
  | "Boost"
  | "eSIM"
  | "Fund Wallet";

export type User = {
  id: string;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  userName: string;
  emailVerified: boolean;
  status: string;
  role: string;
  imageUrl: string | null;
  last_login: string;
  createdAt: string;
  updatedAt: string;
};

export type Currency = {
  id: string;
  name: string;
  symbol: string;
  country: string;
  decimals: number;
  created_date: string;
  updated_date: string;
};

export type CurrencyProps = {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  created_date: string;
  updated_date: string;
};

export type IWallet = {
  id: string;
  customer: { customer: Customer };
  balance: string;
  hold: string;
  status: string;
  created_date: string;
  updated_date: string;
};

export type WalletProps = { currency: CurrencyProps } & IWallet;

export type TransactionProps = {
  id: string;
  status: string;
  amount: string;
  fee: string;
  balance: string;
  from: null;
  to: null;
  localAmount: string;
  providerOrderId: string;
  rate: string;
  reference: string;
  direction: string;
  description: string;
  type: string;
  method: null;
  created_date: string;
  createdAt: string;
  payment: {
    id: string;
    status: string;
    provider: string;
    amount: string;
    providerReference: string;
    description: string;
    createdDate: string;
    updatedDate: string;
  };
};

export type ITransaction = TransactionProps & {
  wallet: IWallet;
  currency: CurrencyProps;
  order: OrderProps;
  customer: Customer;
};

export type TransactionResponse = ApiResponse & {
  transactions: ITransaction[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
};
