const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
});

export default getHeaders;
