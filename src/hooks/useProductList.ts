import useProductDropdown from './useProductDropdown';
import useProductListQuery from './useProductListQuery';

const useProductList = () => {
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown();
  const { data, isLoading, hasNextPage, fetchNextPage } = useProductListQuery({
    category: category.value,
    sortOptions: order.value,
  });

  return {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    handleChangeCategory,
    handleChangeSort,
    category,
    order,
  };
};

export default useProductList;
