import { useCallback } from "react";
import { ProductCategory } from "../types/ProductCategory";
import { PriceSort } from "../types/Sort";
import fetchProductList from "../apis/product/productList/fetchProductList";
import useData from "./useData";

const useProductListData = ({
  category,
  sort,
}: {
  category: ProductCategory;
  sort: PriceSort;
}) => {
  const getProductList = useCallback(async () => {
    try {
      const { content } = await fetchProductList({
        params: {
          category,
          sort,
          page: "0",
          size: "20",
        },
      });
      return content;
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      throw new Error(error.message);
    }
  }, [category, sort]);

  const {
    data: productList,
    loading,
    refetch,
  } = useData({
    fetcher: getProductList,
    name: "productList",
  });

  return { productList, loading, refetch };
};

export default useProductListData;
