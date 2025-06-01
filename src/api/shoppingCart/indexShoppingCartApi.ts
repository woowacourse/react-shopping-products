import { createApiClient } from "../createApiClient";

const token = import.meta.env.VITE_APP_TOKEN;
const baseUrl = import.meta.env.VITE_BASE_URL;

export const indexshoppingCartApi = createApiClient({
  baseUrl,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Basic ${token}`,
  },
});
