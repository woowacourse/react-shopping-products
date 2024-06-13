import useProductDropdown from './useProductDropdown';
import useProductList from './useProductList';

const useProduct = () => {
  const { category, order, handleChangeCategory, handleChangeSort } = useProductDropdown();
  const { data, isPending, isFetching, fetchNextPage, hasNextPage } = useProductList({
    category: category.value,
    sortOptions: order.value,
  });

  return {
    category: category.label,
    order: order.label,
    handleChangeCategory,
    handleChangeSort,
    data,
    isPending,
    isFetching,
    fetchNextPage,
    hasNextPage,
  };
};

export default useProduct;
