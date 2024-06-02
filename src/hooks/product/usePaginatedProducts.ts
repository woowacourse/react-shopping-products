import { Category, SortType } from '@pages/ProductPage/Product.types';
import { useCallback, useEffect, useState } from 'react';

import { BaseResponse } from '@appTypes/response';
import { Product } from '@appTypes/product';
import { getProductEndpoint } from '@pages/ProductPage/ProductPage.util';
import useFetch from '@hooks/useFetch';

interface usePaginatedProductsProps {
  errorHandler: (string: string) => void;
}
const usePaginatedProducts = ({ errorHandler }: usePaginatedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const [category, setCategory] = useState<Category>('전체');
  const [sortType, setSortType] = useState<SortType>('낮은 가격순');
  const [page, setPage] = useState(0);

  const updateCategory = (nextCategory: Category) => {
    if (nextCategory === category) return;
    setCategory(nextCategory);
    setPage(0);
  };

  const updateSortType = (nextSortType: SortType) => {
    if (nextSortType === sortType) return;
    setSortType(nextSortType);
    setPage(0);
  };

  const { data, isLoading } = useFetch<BaseResponse<Product[]>>(
    getProductEndpoint({ category, page, sortType }),
    errorHandler
  );

  useEffect(() => {
    if (!data) return;

    setProducts(prev =>
      page === 0 ? [...data.content] : [...prev, ...data.content]
    );
  }, [page, data]);

  const updateNextProductPage = useCallback(() => {
    if (data?.last) return;
    setPage(prev => prev + 1);
  }, [data]);

  return {
    products,
    page,
    sortType,
    category,
    isLoading,
    updateNextProductPage,
    updateCategory,
    updateSortType,
  };
};

export default usePaginatedProducts;
