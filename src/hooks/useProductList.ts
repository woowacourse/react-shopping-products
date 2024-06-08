import useProductListQuery from './queries/productList/useProductListQuery';

import { ProductCategory, SortValue } from '@/types/product';

interface UseProductListProp {
  category?: ProductCategory;
  sortOptions?: SortValue;
}

const useProductList = ({ category, sortOptions }: UseProductListProp) => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useProductListQuery({
    category,
    sortOptions,
  });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
  };
};

export default useProductList;
