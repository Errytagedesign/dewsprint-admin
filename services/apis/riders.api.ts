import { ApiResponse } from "@/types/auth";
import { Api } from "./api";
import { queryBuilder } from "@/utils/helpers";
import {
  RidersByIdRsp,
  RidersDocsReviewType,
  RidersDocsRsp,
  RidersResponse,
  RidersStatRsp,
  RidersType,
} from "@/types/riders";
import { OrderResponse } from "@/types/orders";

export const getRidersApi = ({
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
  return Api.get<RidersResponse>(
    `/admin/riders?${queryBuilder({ page, limit, search: String(search), status: String(status) })}`,
    true,
  );
};

export const getRidersStatsApi = () => {
  return Api.get<RidersStatRsp>(`/wallet/statistics`, true);
};

export const getRidersByIdApi = (userId: string) => {
  return Api.get<RidersByIdRsp>(`/admin/riders/${userId}`, true);
};

export const suspendRidersApi = (userId: string) => {
  return Api.patch<undefined, ApiResponse & { data: RidersType }>(
    `/admin/riders/${userId}/suspend`,
    undefined,
    true,
  );
};

export const unsuspendRidersApi = (userId: string) => {
  return Api.patch<undefined, ApiResponse & { data: RidersType }>(
    `/admin/riders/${userId}/unsuspend`,
    undefined,
    true,
  );
};

export const deleteRidersApi = (userId: string) => {
  return Api.delete<undefined, ApiResponse & { data: RidersType }>(
    `/admin/riders/${userId}`,
    undefined,
    true,
  );
};

export const getRiderDocumentsApi = (riderId: string) => {
  return Api.get<RidersDocsRsp>(
    `/admin/rider-documents/${riderId}/documents`,
    true,
  );
};

export const getRiderOrdersApi = ({
  riderId,
  page = "1",
  limit = "10",
}: {
  riderId: string;
  page?: string;
  limit?: string;
}) => {
  return Api.get<OrderResponse>(
    `/admin/riders/${riderId}/orders?page=${page}&limit=${limit}`,
    true,
  );
};

export const reviewRiderDocumentsApi = (
  documentId: string,
  body: RidersDocsReviewType,
) => {
  return Api.patch<RidersDocsReviewType, ApiResponse>(
    `/admin/rider-documents/${documentId}/review`,
    body,
    true,
  );
};
