import { Api } from "./api";
import {
  ConfigsGroupedResponse,
  SingleConfigResponse,
  UpdateConfigResponse,
  BulkUpdateConfigRequest,
  AuditLogsResponse,
} from "@/types/configurations.types";

/**
 * Get all configurations grouped by category
 * GET /admin/settings/grouped
 */
export const getConfigurationsGrouped = () => {
  return Api.get<ConfigsGroupedResponse>("/admin/settings/grouped", true);
};

/**
 * Get a single configuration by key
 * GET /admin/settings/:key
 */
export const getConfiguration = (key: string) => {
  return Api.get<SingleConfigResponse>(
    `/admin/settings/${encodeURIComponent(key)}`,
    true
  );
};

/**
 * Update a single configuration
 * PATCH /admin/settings/:key
 */
export const updateConfiguration = (key: string, value: string | number) => {
  return Api.patch<{ value: string | number }, UpdateConfigResponse>(
    `/admin/settings/${encodeURIComponent(key)}`,
    { value },
    true
  );
};

/**
 * Bulk update multiple configurations
 * PATCH /admin/settings
 */
export const bulkUpdateConfigurations = (configs: BulkUpdateConfigRequest) => {
  return Api.patch<BulkUpdateConfigRequest, UpdateConfigResponse>(
    "/admin/settings",
    configs,
    true
  );
};

/**
 * Get audit logs for all configuration changes
 * GET /admin/settings/audit-logs
 */
export const getConfigurationAuditLogs = ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  return Api.get<AuditLogsResponse>(
    `/admin/settings/audit-logs?page=${page}&limit=${limit}`,
    true
  );
};
