import { queryBuilder } from "@/utils/helpers";
import { Api } from "./api";
import { TransactionResponse } from "@/types/transactions";

export const getTransactionsApi = async ({
  page = "1",
  limit = "10",
  search,
  status,
}: {
  page?: string;
  limit?: string;
  search?: string;
  status?: string;
}) => {
  return Api.get<TransactionResponse>(
    `/admin/transactions?${queryBuilder({ page, limit, search: String(search), status: String(status) })}`,
    true,
  );
};

export const getTransactionsByUserIdApi = async ({
  userId,
  page = 1,
  limit = 10,
  search,
  type,
}: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  userId: string;
}) => {
  return Api.get<TransactionResponse>(
    `/wallet/transaction/user/${userId}?page=${page}&limit=${limit}${
      type ? `&type=${type}` : ""
    }${search ? `&search=${search}` : ""}`,
    true,
  );
};
