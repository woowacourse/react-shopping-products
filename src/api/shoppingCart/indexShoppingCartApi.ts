import { createApiClient } from "../createApiClient";

const token = import.meta.env.VITE_APP_TOKEN;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const indexShoppingCartApi = createApiClient({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${token}`,
  },
});
