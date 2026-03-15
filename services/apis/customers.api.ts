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
  return Api.get<CustomerByIdRspProps>(`/admin/users/${userId}`, true);
};

export const suspendCustomersApi = (userId: string) => {
  return Api.patch<undefined, ApiResponse & { data: CustomerType }>(
    `/admin/users/${userId}/suspend`,
    undefined,
    true,
  );
};

export const unsuspendCustomersApi = (userId: string) => {
  return Api.patch<undefined, ApiResponse & { data: CustomerType }>(
    `/admin/users/${userId}/unsuspend`,
    undefined,
    true,
  );
};

export const deleteCustomerApi = (userId: string) => {
  return Api.delete<undefined, ApiResponse & { data: CustomerType }>(
    `/admin/users/${userId}`,
    undefined,
    true,
  );
};
