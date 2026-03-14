import { User } from "./customers.types";

export type RentalsProps = {
  id: string;
  status: string;
  amount: string;
  created_date: string;
  country: string;
  number?: string;
  daysLeft: number;
  user: User;
};

export type SmsProps = {
  id: string;
  user: User;
  amount: number;
  created_date: string;
  status: string;
  country: string;
  number?: string;
  code?: string;
};

export type EsimProps = {
  id: string;
  user: User;
  type: string;
  amount: number;
  created_date: string;
  status: string;
  country: string;
  number?: string;
  plan: { validity: number; dataSize: number };
  coverage: string;
};

export type BoostProps = {
  id: string;
  user: User;
  category: string;
  amount: number;
  created_date: string;
  status: string;
  service: string;
};

export type TableProps =
  | RentalsProps
  | User
  | SmsProps
  | BoostProps
  | EsimProps;
