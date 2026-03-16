import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import { Order, OrderType } from "./orders";
import { ITransaction, TransactionType } from "./transactions";
import { RidersType } from "./riders";
import { CustomerType } from "./customers";

export type AllAssets =
  | OrderType[]
  | ITransaction[]
  | RidersType[]
  | CustomerType[]
  | TransactionType[];

export type SearchParams = {
  searchParams: Promise<{
    tab: string;
  }>;
};

export type ActionFormStatus = {
  error: boolean;
  message: string;
};

export type PagesTabParams = {
  searchParams: Promise<{ tab: string; page: string; search: string }>;
};

export type PaginationType = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
