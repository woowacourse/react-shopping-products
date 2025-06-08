import { baseUrl } from './config';

export const getProducts = async (sort: string, category?: string) => {
  if (category === '전체') {
    const response = await fetch(
      `${baseUrl}/products?&page=0&size=20&sort=price,${sort}&sort=id,desc`,
    );

    const data = await response.json();
    return data;
  } else if (category) {
    const response = await fetch(
      `${baseUrl}/products?category=${category}&page=0&size=20&sort=price,${sort}&sort=id,desc`,
    );

    const data = await response.json();
    return data;
  }
};
