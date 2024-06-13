import useProductFilter from './useProductFilter';

import { productQuery } from './queries/products';

const useProductList = () => {
  const { category, order, handleChangeCategory, handleChangeSort } = useProductFilter();

  const { data, isFetching, fetchNextPage, hasNextPage, isLoading } =
    productQuery.useGetProductList({ category, order });

  const productList = data?.pages.flatMap((page) => page.content) || [];

  return {
    hasNextPage,
    isFetching,
    isLoading,
    productList,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSort,
    category,
    order,
  };
};

export default useProductList;
