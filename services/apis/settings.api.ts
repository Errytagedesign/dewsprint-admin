import { ApiResponse } from "@/types/auth";
import { Api } from "./api";
import {
  AddTeamMatesProps,
  GetTeamsRsp,
  UpdateUserRsp,
} from "@/types/settings";

export const updateCurrentUserApi = (body: FormData) => {
  return Api.patch<FormData, UpdateUserRsp>("/users/profile", body, true);
};

export const addTeamMatesApi = (body: AddTeamMatesProps) => {
  return Api.post<AddTeamMatesProps, ApiResponse>(
    "/users/create-team-member",
    body,
    true,
  );
};

export const getTeamMatesApi = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return Api.get<GetTeamsRsp>(
    `/users/team/members?page=${page}&limit=${limit}`,
    true,
  );
};

export const deleteTeamMatesApi = (id: string) => {
  return Api.delete<undefined, ApiResponse>(
    `/users/team/member/${id}`,
    undefined,
    true,
  );
};
