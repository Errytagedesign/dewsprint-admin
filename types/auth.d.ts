export type VehicleTypes = "BICYCLE" | "MOTORCYCLE" | "CAB" | "TRUCK";

export type EncryptData = {
  userData: UserDataAndAccessToken;
  expires: Date;
};

export type UserSession = {
  userData: UserDataAndAccessToken;
  expires: Date;
  iat: number;
  exp: number;
};

export type ResetPasswordTypes = {
  resetToken: string;
  newPassword: string;
};

export type UpdatePasswordTypes = {
  currentPassword: string;
  newPassword: string;
};

export type ApiResponse = {
  success: boolean;
  statusCode?: number;
  code: number;
  message: string;
};

export type SendOTPTypes = {
  email: string;
};

export type VerifyOTPTypes = {
  email: string;
  code: string;
};

export type VerifyOTPResponse = ApiResponse & {
  data: {
    resetToken: string;
  };
};

export type SignUpTypes = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  cityId: string;
  vehicleType: VehicleTypes;
  code?: string;
  resetToken?: string;
};

export type LoginTypes = {
  email: string;
  password: string;
};

export type RefreshTokenTypes = {
  refreshToken: string;
};

export type FileTypes = {
  uri: string;
  name: string;
  size: number;
  type: string;
};

export type UpdateProfileTypes = {
  fullName: string;
  dateOfBirth: string;
  monthlyIncome: string;
  employmentStatus: string;
  file?: FileTypes;
  hasBiometric?: boolean;
  phoneNumber: string;
};

export type UserDataTypes = {
  city: { id: string; name: string };
  cityId: string;
  email: string;
  emailVerified: boolean;
  id: string;
  name: string;
  phone: string;
  profilePhotoUrl: string;
  role: "ADMIN";
  walletBalance: number;
  currentLat: number;
  currentLng: number;
  isAvailable: boolean;
  isOnline: boolean;
  isVerified: boolean;
  vehicleType: VehicleTypes;
  vehicleNumber: string;
};

export type AuthResponse = ApiResponse & {
  data: {
    tokens: { accessToken: string; refreshToken: string };
    emailVerified: boolean;
    user: UserDataTypes;
  };
};

export type UserDataAndAccessToken = {
  tokens: { accessToken: string; refreshToken: string };
  user: UserDataTypes;
};

export type AccessToken = { accessToken: string };

export type SocialSignupTypes = {
  phoneNumber: string;
  password: string;
};

export type IPInforType = {
  ip: string;
  success: boolean;
  type: "IPv4" | "IPv6";
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  region: string;
  region_code: string;
  city: string;
  latitude: number;
  longitude: number;
  is_eu: boolean;
  postal: string;
  calling_code: string;
  capital: string;
  borders: string;
  flag: {
    img: string;
    emoji: string;
    emoji_unicode: string;
  };
  connection: {
    asn: number;
    org: string;
    isp: string;
    domain: string;
  };
  timezone: {
    id: string;
    abbr: string;
    is_dst: boolean;
    offset: number;
    utc: string;
    current_time: string;
  };
};

export type OnlineStatuSwitchType = {
  isOnline: boolean;
};

export type RiderStatsType = {
  cancelledOrders: number;
  companyEarnings: number;
  completedOrders: number;
  hoursOnline: number;
  isOnline: boolean;
  riderEarnings: number;
  totalOrders: number;
  walletBalance: number;
};

export type RiderVerificationStatusType = {
  allVerified: boolean;
  label: string;
  totalRequired: number;
  verifiedCount: number;
};

export type DocumentsType =
  | "SELFIE"
  | "VEHICLE_REGISTRATION_CERTIFICATE"
  | "INSURANCE"
  | "DRIVERS_LICENSE"
  | "MEANS_OF_IDENTIFICATION";

export type GetUploadedDocumentsType = {
  createdAt: string;
  documentUrl: string;
  id: string;
  rejectionReason: string | null;
  reviewedAt: string | null;
  reviewedById: string | null;
  riderId: string;
  status: string;
  type: string;
  updatedAt: string;
};

export type UpdateUserType = {
  name: string;
  phone: string;
  vehicleType: VehicleTypes;
  vehicleNumber: string;
  cityId: string;
  postcode: string;
  currentLat: number;
  currentLng: number;
};
