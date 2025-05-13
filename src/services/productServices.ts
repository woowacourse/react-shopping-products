import apiClient from './apiClient';

export const getProducts = async () => {
  try {
    const data = await apiClient({ method: 'GET', URI: '/products' });
    return data.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
