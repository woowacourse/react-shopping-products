import useProductFilters from './useProductFilters';
import useProductData from './useProductData';

const useShoppingItemList = () => {
  const { sortOption, categoryOption, handleSortChange, handleCategoryChange } =
    useProductFilters();

  const { products, error, isLoading, retryFetch } = useProductData(
    sortOption,
    categoryOption
  );

  return {
    data: products,
    handleSortClick: handleSortChange,
    handleCategoryClick: handleCategoryChange,
    selected: sortOption,
    category: categoryOption,
    error,
    isLoading,
    retryFetch,
  };
};

export default useShoppingItemList;
