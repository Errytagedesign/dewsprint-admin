import { ApiResponse, UserData } from "./auth.types";
import { User } from "./customers.types";

export type SelectProps = "all" | "members" | "customers";

export type SendEmailProps = {
  to?: string[];
  subject: string;
  body: string;
  select?: SelectProps;
};

export type SendPushProps = {
  to?: string[];
  title: string;
  body: string;
  select?: SelectProps;
};

export type GetAllUsers = ApiResponse & {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  users: User[];
};

export type EmailProps = {
  id: string;
  subject: string;
  body: string;
  status: string;
  error: string | null;
  createdAt: string;
  sender: User[];
  recipients: number;
};

export type PushProps = {
  id: string;
  title: string;
  body: string;
  status: string;
  error: string | null;
  created_at: string;
  sender: User[];
  recipients: number;
};

export type GetEmailsRsp = ApiResponse & {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  emails: EmailProps[];
};

export type GetPushNotificationRsp = ApiResponse & {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  notifications: EmailProps[];
};
