import apiClient from './apiClient';

export const getProducts = async () => {
  const data = await apiClient({ method: 'GET', URI: '/proucts?page=0&size=20' });
  return data.content;
};
