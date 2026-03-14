import { ApiResponse, UserData } from "./auth.types";

export type UpdateuserProps = {
  fullName: string;
  file: File;
};

export type UpdateUserRsp = ApiResponse & {
  data: UserData;
};

export type AddTeamMatesProps = {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export type GetTeamsRsp = ApiResponse & {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  teamMembers: UserData[];
};
