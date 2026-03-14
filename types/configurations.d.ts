// Configuration entry from backend API
export type ConfigEntry = {
  id: string;
  key: string;
  value: string;
  valueType: "number" | "string";
  category: string;
  displayName: string;
  description: string;
  isEditable: boolean;
  updatedAt: string;
};

// Category keys as returned by the API
export type ConfigCategory =
  | "exchange_rates"
  | "service_fees"
  | "subscription_pricing"
  | "payment_limits";

// Grouped configurations from GET /admin/settings/grouped
export type GroupedConfigs = {
  [K in ConfigCategory]?: ConfigEntry[];
};

// API Response types
export type ConfigsGroupedResponse = {
  success: boolean;
  data: GroupedConfigs;
};

export type SingleConfigResponse = {
  success: boolean;
  data: ConfigEntry;
};

export type UpdateConfigResponse = {
  success: boolean;
  data: ConfigEntry;
  message: string;
};

export type BulkUpdateConfigRequest = {
  configs: Array<{ key: string; value: string | number }>;
};

// Display names for categories
export const CATEGORY_DISPLAY_NAMES: Record<ConfigCategory, string> = {
  exchange_rates: "Exchange Rates",
  service_fees: "Service Fees",
  subscription_pricing: "Subscription Pricing",
  payment_limits: "Payment Limits",
};

// Order for displaying categories
export const CATEGORY_ORDER: ConfigCategory[] = [
  "exchange_rates",
  "service_fees",
  "subscription_pricing",
  "payment_limits",
];

// Audit log types
export type AuditLogUser = {
  id: string;
  email: string;
};

export type AuditLogEntry = {
  id: string;
  configKey: string;
  previousValue: string;
  newValue: string;
  changedBy: AuditLogUser;
  ipAddress: string;
  createdAt: string;
};

export type AuditLogsResponse = {
  success: boolean;
  data: {
    logs: AuditLogEntry[];
    total: number;
    page: number;
    totalPages: number;
  };
};
