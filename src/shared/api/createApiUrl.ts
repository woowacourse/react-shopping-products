import { SHOP_API } from "./config";

export const createApiUrl = (
  endpoint: string,
  params?: Record<string, string>
) => {
  const searchParams = new URLSearchParams(params);
  return `${SHOP_API.baseUrl}${endpoint}?${searchParams.toString()}`;
};
