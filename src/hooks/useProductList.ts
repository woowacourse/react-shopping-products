import { ChangeEvent, useEffect, useState } from 'react';

import { fetchProductList } from '@/api/product';
import { Product, ProductCategory, Sort } from '@/types/product';

const useProductList = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [category, setCategory] = useState<ProductCategory>('fashion');
  const [order, setOrder] = useState<Sort>('asc');

  const handleChangeCategory = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProductCategory;

    setCategory(value);
    setPage(0);
  };
  const handleChangeSort = async (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Sort;

    setOrder(value);
    setPage(0);
  };

  const fetchNextPage = () => {
    if (isLastPage) return;

    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const getProductList = async () => {
      try {
        setIsLoading(true);
        const limit = page === 0 ? 20 : 4;
        const { content, last } = await fetchProductList({
          page,
          category,
          size: limit,
          sortOptions: order,
        });
        if (last) {
          setIsLastPage(true);
        } else {
          setIsLastPage(false);
        }
        page === 0 ? setProductList(content) : setProductList((prev) => [...prev, ...content]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProductList();
  }, [page, category, order]);

  return {
    productList,
    page,
    fetchNextPage,
    isLoading,
    handleChangeCategory,
    handleChangeSort,
    category,
    order,
  };
};

export default useProductList;
