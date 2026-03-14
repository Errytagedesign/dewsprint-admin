import { ApiResponse } from "@/types/auth";
import { Api } from "./api";
import {
  CustomerByIdRspProps,
  CustomerResponse,
  CustomerStatRspProps,
  CustomerType,
} from "@/types/customers";
import { queryBuilder } from "@/utils/helpers";

export const getCustomersApi = ({
  status,
  page = "1",
  limit = "5",
  search,
}: {
  status?: string;
  page?: string;
  limit?: string;
  search?: string;
}) => {
  return Api.get<CustomerResponse>(
    `/admin/users?${queryBuilder({ page, limit, search: String(search), status: String(status) })}`,
    true,
  );
};

export const getCustomerStatsApi = () => {
  return Api.get<CustomerStatRspProps>(`/wallet/statistics`, true);
};

export const getCustomerByIdApi = (userId: string) => {
  return Api.get<CustomerByIdRspProps>(`/customers/${userId}`, true);
};

export const restrictCustomerApi = (userId: string) => {
  return Api.patch<undefined, ApiResponse & { data: CustomerType }>(
    `/users/${userId}/restrict`,
    undefined,
    true,
  );
};
