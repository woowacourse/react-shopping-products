import { baseUrl } from './config';

export const getProducts = async (sort: string) => {
  const response = await fetch(
    `${baseUrl}/products?page=0&size=20&sort=price,${sort}&sort=id,desc`
  );
  const data = await response.json();

  return data;
};
