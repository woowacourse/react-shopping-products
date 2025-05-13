import apiClient from './apiClient';

export const getProducts = async () => {
  const data = await apiClient({ method: 'GET', URI: '/products' });
};
