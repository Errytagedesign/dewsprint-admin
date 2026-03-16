import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import { Order, OrderType } from "./orders";
import { ITransaction } from "./transactions";
import { RidersType } from "./riders";
import { CustomerType } from "./customers";

export type AllAssets =
  | OrderType[]
  | ITransaction[]
  | RidersType[]
  | CustomerType[];

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
