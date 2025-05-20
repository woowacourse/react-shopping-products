export const baseURL = import.meta.env.VITE_API_URL;
export const baseHeaders = {
  Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
};
