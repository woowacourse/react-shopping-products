import { useState } from "react";
import { getProducts } from "../apis/product";
import { GetProductResponse } from "../types/product";
import { FilterType, SortType } from "../types";
import useQuery from "./common/useQuery";

type ProductsOption = {
  filter: FilterType;
  sort: SortType;
};

const useProducts = () => {
  const [productsOption, setProductsOption] = useState<ProductsOption>({
    filter: "전체",
    sort: "높은 가격순",
  });
  const { filter, sort } = productsOption;

  const { data } = useQuery<GetProductResponse>({
    queryKey: `/products?filter=${filter}&sort=${sort}`,
    fetchFn: () =>
      getProducts({
        category: filter === "전체" ? "" : filter,
        page: 0,
        size: 20,
        sort: sort === "낮은 가격순" ? "asc" : "desc",
      }),
  });

  return {
    products: data?.content || [],
    filter: productsOption.filter,
    sort: productsOption.sort,
    setFilter: (filter: FilterType) => setProductsOption((prev) => ({ ...prev, filter })),
    setSort: (sort: SortType) => setProductsOption((prev) => ({ ...prev, sort })),
  };
};

export default useProducts;
