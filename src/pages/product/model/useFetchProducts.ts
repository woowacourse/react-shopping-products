import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

import {
  ALL,
  Category,
  DEFAULT_CATEGORY,
  DEFAULT_SORT_ORDER,
  Product,
  ProductsResponse,
  QUERY_KEYS,
  SortOrder,
  productApi,
} from '@/shared';

import { EXTRA_FETCH_COUNT, FIRST_FETCH_COUNT, SECONDARY_REQUEST_PAGE_GAP } from '../config/fetchProduct';

interface UseFetchProductsResult {
  products: Product[];
  isLoading: boolean;
  error: unknown;
  totalPage: number;
  page: number;
  category: typeof ALL | Category;
  sortOrder: SortOrder;
  fetchProductsData: (page: number, category: typeof ALL | Category, sortOrder: SortOrder) => void;
}

const fetchProducts = async (page: number, category: typeof ALL | Category, sortOrder: SortOrder) => {
  const size = page === 0 ? FIRST_FETCH_COUNT : EXTRA_FETCH_COUNT;
  const requestPage = page === 0 ? 0 : page + SECONDARY_REQUEST_PAGE_GAP;
  const response = await productApi.get({ page: requestPage, size, category, sortOrder });
  return response;
};

export default function useFetchProducts(): UseFetchProductsResult {
  const [page, setPage] = useState(0);
  const [category, setCategory] = useState<typeof ALL | Category>(DEFAULT_CATEGORY);
  const [sortOrder, setSortOrder] = useState<SortOrder>(DEFAULT_SORT_ORDER);
  const [products, setProducts] = useState<Product[]>([]);
  const queryClient = useQueryClient();

  const { isLoading, error } = useQuery<ProductsResponse>({
    queryKey: [QUERY_KEYS.getProducts, page, category, sortOrder],
    queryFn: () => fetchProducts(page, category, sortOrder),
  });

  return {
    products,
    isLoading,
    error,
    totalPage:
      queryClient.getQueryData<ProductsResponse>([QUERY_KEYS.getProducts, page, category, sortOrder])?.totalPages || 0,
    page,
    category,
    sortOrder,
    fetchProductsData: (newPage: number, newCategory: typeof ALL | Category, newSortOrder: SortOrder) => {
      setPage(newPage);
      setCategory(newCategory);
      setSortOrder(newSortOrder);
    },
  };
}
