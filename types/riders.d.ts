import { ApiResponse } from "./auth";
import { PaginationType } from "./global";

export type VehicleTypes = "BICYCLE" | "MOTORCYCLE" | "CAB" | "TRUCK";

export type RidersType = {
  city: { id: string; name: string };
  cityId: string;
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  phone: string;
  profilePhotoUrl: string;
  role: "RIDER";
  status: string;
  walletBalance: number;
  currentLat: number;
  currentLng: number;
  isAvailable: boolean;
  isOnline: boolean;
  isVerified: boolean;
  vehicleType: VehicleTypes;
  vehicleNumber: string;
  createdAt: string;
};

export type RidersResponse = ApiResponse & {
  data: {
    items: RidersType[];
    pagination: PaginationType;
  };
};

export type RidersDetails = ApiResponse & {
  totalWalletAmount: number;
  totalTransactions: number;
  totalTransactionAmount: number;
  user: RidersType;
};

export type RidersStatProps = {
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

export type RidersStatRsp = ApiResponse & {
  data: RidersStatProps;
};

export type RidersByIdRsp = ApiResponse & {
  data: { rider: RidersType };
};

export type RiderDocsType = {
  id: string;
  riderId: string;
  type: string;
  documentUrl: string;
  status: string;
  rejectionReason: null;
  reviewedAt: string;
  reviewedById: string;
  createdAt: string;
  updatedAt: string;
};

export type RidersDocsRsp = ApiResponse & {
  data: { documents: RiderDocsType[] };
};

export type RidersDocsReviewType = {
  status: "APPROVED" | "REJECTED";
  rejectionReason?: string;
};
