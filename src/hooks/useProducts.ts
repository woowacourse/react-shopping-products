import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import { GetProductResponse } from "../types/product";
import { useErrorMessage, useLoading } from "../contexts";
import { FilterType, SortType } from "../types";

type ProductsOption = {
  filter: FilterType;
  sort: SortType;
};

const useProducts = () => {
  const [productsResponse, setProductsResponse] = useState<GetProductResponse>();
  const [productsOption, setProductsOption] = useState<ProductsOption>({
    filter: "전체",
    sort: "높은 가격순",
  });
  const { filter, sort } = productsOption;

  const { setErrorMessage } = useErrorMessage();
  const { setIsLoading } = useLoading();

  const getProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({
        category: filter === "전체" ? "" : filter,
        page: 0,
        size: 20,
        sort: sort === "낮은 가격순" ? "asc" : "desc",
      });
      setProductsResponse(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [filter, setErrorMessage, setIsLoading, sort]);

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return {
    products: productsResponse?.content || [],
    filter: productsOption.filter,
    sort: productsOption.sort,
    setFilter: (filter: FilterType) => setProductsOption((prev) => ({ ...prev, filter })),
    setSort: (sort: SortType) => setProductsOption((prev) => ({ ...prev, sort })),
  };
};

export default useProducts;
