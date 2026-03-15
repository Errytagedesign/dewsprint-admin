import {
  JAPBalRsp,
  OrderByCountryRsp,
  OrderSubSumRsp,
  OrderSumRsp,
  ReloadlyBalRsp,
  SMSPoolBalRsp,
} from "@/types/dashboard";
import { Api } from "./api";
import { CustomerStatRspProps } from "@/types/customers";

export const getOrderSummaryApi = () => {
  return Api.get<OrderSumRsp>(`/orders/active-summary-by-type`, true);
};

export const getSubscriptionSummaryApi = () => {
  return Api.get<OrderSubSumRsp>(`/subscriptions/active-summary`, true);
};

export const getCustomerStatsApi = () => {
  return Api.get<CustomerStatRspProps>(`/wallet/statistics`, true);
};

export const getOrdersByCountryApi = (type: string) => {
  return Api.get<OrderByCountryRsp>(
    `/orders/active-by-country?type=${type}`,
    true,
  );
};

export const getSMSPoolBalanceAPi = () => {
  return Api.get<SMSPoolBalRsp>(`/virtual-comms/provider/balance`, true);
};

export const getJAPBalanceAPi = () => {
  return Api.get<JAPBalRsp>(`/third-party/jap/balance`, true);
};

export const getReloadlyBalanceAPi = () => {
  return Api.get<ReloadlyBalRsp>(`/third-party/reloadly/balance`, true);
};
