import { useCallback, useEffect, useState } from 'react';

import { Product } from '@appTypes/product';
import useFetch from '@hooks/useFetch';
import usePagination from '@hooks/usePagination';
import useSelectProductDropdown from '@hooks/product/useSelectProductDropdown';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import { getProductEndpoint } from '@hooks/product/useProducts/useProducts.util';
import { InfinityScrollResponse } from '@appTypes/response';
import {
  ProductDropdownOptionKeys,
  ProductDropdownOptions,
} from '@components/product/ProductDropdown/ProductDropdown.type';

interface UseProductResult {
  products: Product[];
  page: number;
  dropdownOptions: ProductDropdownOptions;
  isLoading: boolean;
  updateNextProductItem: () => void;
  onSelectOption: <T extends ProductDropdownOptionKeys>(
    type: 'sort' | 'category',
    option: T
  ) => void;
}

const useProducts = (): UseProductResult => {
  const { page, resetPage, updateNextPage } = usePagination();

  const resetProducts = () => setProducts([]);

  const { dropdownOptions, onSelectOption } = useSelectProductDropdown(resetPage, resetProducts);

  const [products, setProducts] = useState<Product[]>([]);

  const showToast = useToastContext();

  const { data, isLoading } = useFetch<InfinityScrollResponse<Product[]>>(
    getProductEndpoint({ ...dropdownOptions, page }),
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
    dropdownOptions,
    isLoading,
    updateNextProductItem,
    onSelectOption,
  };
};

export default useProducts;
