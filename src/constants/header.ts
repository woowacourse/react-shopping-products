const authHeader = `Basic ${btoa(
  `${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`
)}`;
export const commonOpts = {
  headers: {
    Authorization: authHeader,
    "Content-Type": "application/json",
  },
};
