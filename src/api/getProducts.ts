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
    throw new Error(
      `상품 목록을 불러오는 중 오류가 발생했습니다 (${res.status} ${res.statusText})`,
    );
  }
  const data = await res.json();
  return data.content;
}

export default getProducts;
