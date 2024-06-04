import { useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../api/product';
import { Product } from '../../types/Product.type';
import { Option } from '../../types/Option.type';
import { SIZE } from '../../constants/api';

interface UseProductsResult {
  products: Product[];
  isFetching: boolean;
  isError: boolean;
  hasNextPage: boolean;
  category: Option;
  sort: Option;
  handleCategory: (category: Option) => void;
  handleSort: (sort: Option) => void;
  handlePage: () => void;
}

const useProduct = (initialCategory: Option, initialSorting: Option): UseProductsResult => {
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSorting);

  const { data, isError, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['products', category, sort],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => fetchProducts(category.key, pageParam, SIZE.ADDITIONAL, sort.key),
    getNextPageParam: (lastPage, allPages) => (lastPage.isLast ? undefined : allPages.length),
  });

  const handleCategory = (category: Option) => setCategory(category);

  const handleSort = (sort: Option) => setSort(sort);

  const handlePage = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  };

  return {
    products: data?.pages.flatMap((page) => page.data) ?? [],
    isFetching,
    isError,
    hasNextPage,
    category,
    sort,
    handleCategory,
    handleSort,
    handlePage,
  };
};

export default useProduct;
