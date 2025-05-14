import { useEffect, useState } from 'react';
import { ProductDataType } from '../types/product';
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

function useGetProducts({ sort, category }: { sort: string; category: string }) {
  const [products, setProducts] = useState<ProductDataType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getProducts({ category: category, sortKey: 'price', sortOrder: sort });
        setProducts(data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sort, category]);

  return { isLoading, isError, products };
}

export default useGetProducts;
