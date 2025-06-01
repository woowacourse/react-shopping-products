import useData from "./useData";
import { ProductItemType } from "@/types/product";
import { getProducts } from "@/apis/products/getProducts";
import { useCallback } from "react";
import {
  FilterOption,
  SortOption,
} from "@/components/Product/Content/ProductContent.type";

const useGetProductQuery = (
  filterOption: FilterOption,
  sortOption: SortOption
) => {
  const fetchProducts = useCallback(() => {
    return getProducts({ filterOption, sortOption });
  }, [filterOption, sortOption]);
  return useData<ProductItemType[]>({
    fetchFn: fetchProducts,
    name: `productData-${filterOption}-${sortOption}`,
  });
};

export default useGetProductQuery;
