import { ApiResponse } from "./auth.types";

export type OrderByCountryProps = {
  country: string;
  flag: string | null;
  initial: string;
  total: number;
};

export type OrderByCountryRsp = ApiResponse & { data: OrderByCountryProps[] };

export type OrderSumProps = {
  type: string;
  total: number;
  amount: number;
};

export type OrderSumRsp = ApiResponse & {
  data: {
    types: OrderSumProps[];
    total: number;
    amount: number;
  };
};

export type OrderSubSumRsp = ApiResponse & {
  data: {
    types: { type: string; total: number; amount: string }[];
    total: number;
    amount: number;
  };
};

export type SMSPoolBalRsp = ApiResponse & {
  data: {
    balance: string;
    currency: string;
  };
};

export type ReloadlyBalRsp = ApiResponse & {
  balance: string;
  currencyCode: string;
  currencyName: string;
  updatedAt: string;
  lowBalanceThreshold: number;
  maxLowBalanceThreshold: number;
};

export type JAPBalRsp = ApiResponse & {
  balance: string;
  currencyCode: string;
};
