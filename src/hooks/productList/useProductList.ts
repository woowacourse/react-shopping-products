import { useEffect } from "react";
import useProductCategoryFilter from "./useProductCategoryFilter";
import useProductSortFilter from "./useProductSortFilter";
import useProductListData from "./useProductListData";

const useProductList = () => {
  const { category, handleCategory } = useProductCategoryFilter();
  const { sort, handleSort } = useProductSortFilter();
  const { productList, loading, refetch } = useProductListData({
    category,
    sort,
  });

  useEffect(() => {
    refetch();
  }, [category, refetch, sort]);

  return {
    productList,
    loading,
    handleCategory,
    handleSort,
  };
};

export default useProductList;
