import useProductListQuery from './queries/productList/useProductListQuery';

import { ProductCategory, SortValue } from '@/types/product';

interface UseProductListProp {
  category?: ProductCategory;
  sortOptions?: SortValue;
}

const useProductList = ({ category, sortOptions }: UseProductListProp) => {
  const { data, hasNextPage, fetchNextPage, isPending, isFetching } = useProductListQuery({
    category,
    sortOptions,
  });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isPending,
    isFetching,
  };
};

export default useProductList;
