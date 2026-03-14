import { ApiResponse, UserData } from './auth.types';

export type UpdateduserRspData = ApiResponse & {
  updatedBuyer: any;
};

export type CurrentUserRspData = ApiResponse & {
  phoneNumber: string;
  apartment: string;
  logoUrl: string;
  city: string;
  province: string;
  postalCode: string;
  refundable: number;
  isDisplayPhone: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: UserData;
};

// export type TrackingRsp = { error: boolean; message: string; data: Order };

export type MyAccountParams = {
  searchParams: Promise<{ tab: string; trackingId: string; redirect: string }>;
};
