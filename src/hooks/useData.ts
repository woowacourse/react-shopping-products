import { useContext, useEffect } from "react";
import { DataContext } from "../provider/DataProvider";
import { CartItemType, Product } from "../types/response.types";
import useFetchData from "./useFetchData";
import { CategoryType, SortType } from "../types/index.types";

const useData = <T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: { cacheTime?: number }
) => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("");
  }

  const { getData, fetchData, refetch, loading } = context;

  useEffect(() => {
    fetchData(key, fetchFn, options);
  }, [key, fetchFn, options, fetchData]);

  return {
    data: getData<T>(key) || [],
    isLoading: loading(key),
    refetch: () => refetch(key, fetchFn),
  };
};

export const useCartQuery = () => {
  const { getCartItems } = useFetchData();
  return useData<CartItemType[]>("cart", getCartItems);
};

export const useProductQuery = ({
  category,
  sort,
}: {
  category: CategoryType;
  sort: SortType;
}) => {
  const { getProducts } = useFetchData();
  return useData<Product[]>("products", () => getProducts({ category, sort }));
};
