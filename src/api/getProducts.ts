import { CATEGORY } from '../constants/products';

type productsOptionType = {
  category: string;
  sortKey: string;
  sortOrder: string;
};

async function getProducts({ category, sortKey, sortOrder }: productsOptionType) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/products?${
      category !== CATEGORY[0] ? `category=${category}` : ''
    }&page=0&size=20&sort=${sortKey}%2C${sortOrder}`,
  );

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

export default getProducts;
