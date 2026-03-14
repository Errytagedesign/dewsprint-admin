import { ApiResponse } from "./auth";

export type Wallet = {
  id: string;
  balance: string;
  hold: string;
  status: string;
  totalSpent: string;
  created_date: string;
  updated_date: string;
};

export type CustomerType = {
  city: { id: string; name: string };
  cityId: string;
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  phone: string;
  status: string;
  profilePhotoUrl: string;
  role: "USER";
  walletBalance: number;
};

export type CustomerResponse = ApiResponse & {
  data: {
    items: CustomerType[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
};

export type CustomerDetails = ApiResponse & {
  totalWalletAmount: number;
  totalTransactions: number;
  totalTransactionAmount: number;
  user: CustomerType;
};

export type CustomerStatProps = {
  walletStats: {
    totalBalance: string;
    totalProfit: string;
    yearlyStats: {
      percentageChange: number;
      balanceChange: string;
    };
  };
  customerStats: {
    totalCustomers: number;
    yearlyStats: {
      percentageChange: number;
      customerChange: number;
    };
  };
};

export type CustomerStatRspProps = ApiResponse & {
  data: CustomerStatProps;
};

export type CustomerByIdRspProps = ApiResponse & {
  customer: Customer;
};

export type FundWalletTypes = {
  customerId: string;
  amount: number;
};

export type DeductBalanceTypes = {
  customerId: string;
  amount: number;
  description: string;
};
