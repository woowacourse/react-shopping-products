import { useCallback, useEffect, useState } from 'react';

import { BaseResponse } from '@appTypes/response';
import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';
import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { Product } from '@appTypes/product';
import useFetch from '@hooks/useFetch';
import useSelectProductDropdown from '@hooks/product/useSelectProductDropdown';

const useProducts = (): {
  products: Product[];
  page: number;
  sortType: keyof typeof PRODUCT_SORT_MAP;
  category: Product['category'] | 'all';
  updateNextPage: () => void;
  onSelectSortTypeOption: (sortType: keyof typeof PRODUCT_SORT_MAP) => void;
  onSelectCategoryOption: (category: keyof typeof PRODUCT_CATEGORY_MAP) => void;
} => {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);

  const { category, sortType, onSelectCategoryOption, onSelectSortTypeOption } =
    useSelectProductDropdown(
      () => setPage(0),
      () => setProducts([])
    );

  const endpoint = `products?${category === 'all' ? '' : `category=${category}&`}page=${
    page && page + 4
  }&size=${page === 0 ? 20 : 4}&sort=price,${sortType}`;

  const { data } = useFetch<BaseResponse<Product[]>>(endpoint);

  useEffect(() => {
    if (!data) return;

    setProducts((prev) => [...prev, ...data.content]);
  }, [data]);

  const updateNextPage = useCallback(() => {
    if (data?.last) return;
    if (data && data.content.length === 0) return;

    setPage((prev) => prev + 1);
  }, [data]);

  return {
    products,
    page,
    sortType,
    category,
    updateNextPage,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  };
};

export default useProducts;
