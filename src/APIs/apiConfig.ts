const username = import.meta.env.VITE_USERNAME;
const password = import.meta.env.VITE_PASSWORD;
export const baseUrl = import.meta.env.VITE_BASE_URL;
export const credentials = btoa(`${username}:${password}`);
