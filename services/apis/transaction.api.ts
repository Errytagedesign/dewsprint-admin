import { Api } from "./api";
import { TransactionResponse } from "@/types/transactions.types";

export const getTransactionsApi = async ({
  page = 1,
  limit = 10,
  search,
  type,
}: {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
}) => {
  return Api.get<TransactionResponse>(
    `/wallet/transaction/all?page=${page}&limit=${limit}${
      type !== "" && type !== "all" && type !== undefined ? `&type=${type}` : ""
    }${search ? `&search=${search}` : ""}`,
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
