import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import { GetProductResponse } from "../types/product";
import { useErrorMessage, useLoading } from "../contexts";
import { FilterType, SortType } from "../types";

const useProducts = () => {
  const [productsResponse, setProductsResponse] = useState<GetProductResponse>();
  const [filter, setFilter] = useState<FilterType>("전체");
  const [sort, setSort] = useState<SortType>("높은 가격순");

  const { setErrorMessage } = useErrorMessage();
  const { setIsLoading } = useLoading();

  const getProduct = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProductsResponse(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, setIsLoading]);

  const filteredAndSortedProducts = productsResponse?.content
    .filter((product) => filter === "전체" || product.category === filter)
    .sort((a, b) => (sort === "높은 가격순" ? b.price - a.price : a.price - b.price));

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  return {
    products: filteredAndSortedProducts || [],
    filter,
    setFilter,
    sort,
    setSort,
  };
};

export default useProducts;
