import { useEffect } from "react";
import { ProductPageResponse } from "../types/response.types";
import { categoryType, sortType } from "../types/index.types";
import useFetch from "./useFetch";

const SORT_TYPE = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

interface useFetchProductsProps {
  setProducts: (data: ProductPageResponse) => void;
  category: categoryType;
  sort: sortType;
}

function useFetchProducts({
  category,
  setProducts,
  sort,
}: useFetchProductsProps) {
  const { getData, isLoading } = useFetch<ProductPageResponse>();

  const queryString = createQueryString(category, sort);

  useEffect(() => {
    async function getProducts() {
      const products = await getData({
        method: "GET",
        url: `/products?${queryString},`,
        errorType: "PRODUCTS",
      });
      if (products) setProducts(products);
    }

    getProducts();
  }, [getData, queryString, setProducts]);

  return { isLoading };
}

export default useFetchProducts;

function createQueryString(category: categoryType, sort: sortType) {
  const basicQuery = {
    page: "0",
    size: "20",
    sort: SORT_TYPE[sort],
  };
  const query =
    category === "전체"
      ? basicQuery
      : {
          category: category,
          ...basicQuery,
        };
  const queryString = new URLSearchParams(query).toString();

  return queryString;
}
