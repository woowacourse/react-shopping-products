import { useCallback, useEffect, useState } from 'react';

import { BaseResponse } from '@appTypes/response';
import { PRODUCT_CATEGORY_MAP } from '@components/product/CategoryDropdown/CategoryDropdown.constant';
import { PRODUCT_SORT_MAP } from '@components/product/SortDropdown/SortDropdown.constant';
import { Product } from '@appTypes/product';
import useFetch from '@hooks/useFetch';
import usePagination from '@hooks/usePagination';
import useSelectProductDropdown from '@hooks/product/useSelectProductDropdown';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { getProductEndpoint } from '@hooks/product/useProductItems/useProductItems.util';

interface UseProductResult {
  products: Product[];
  page: number;
  sortType: keyof typeof PRODUCT_SORT_MAP;
  category: Product['category'] | 'all';
  isLoading: boolean;
  updateNextProductItem: () => void;
  onSelectSortTypeOption: (sortType: keyof typeof PRODUCT_SORT_MAP) => void;
  onSelectCategoryOption: (category: keyof typeof PRODUCT_CATEGORY_MAP) => void;
}

const useProducts = (): UseProductResult => {
  const { page, resetPage, updateNextPage } = usePagination();

  const { category, sortType, onSelectCategoryOption, onSelectSortTypeOption } =
    useSelectProductDropdown(resetPage, () => setProducts([]));

  const [products, setProducts] = useState<Product[]>([]);

  const { showToast } = useToastContext();

  const { data, isLoading } = useFetch<BaseResponse<Product[]>>(
    getProductEndpoint({ category, page, sortType }),
    showToast
  );

  useEffect(() => {
    if (!data) return;

    setProducts((prev) => [...prev, ...data.content]);
  }, [data]);

  const updateNextProductItem = useCallback(() => {
    if (data?.last) return;

    updateNextPage();
  }, [updateNextPage, data]);

  return {
    products,
    page,
    sortType,
    category,
    isLoading,
    updateNextProductItem,
    onSelectSortTypeOption,
    onSelectCategoryOption,
  };
};

export default useProducts;
