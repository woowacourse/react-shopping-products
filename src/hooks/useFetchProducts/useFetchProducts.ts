import { useEffect, useState } from "react";
import { ProductPageResponse } from "./index.types";
import { categoryType, sortType } from "../../types/index.types";
import useFetch from "../useFetch/useFetch";

const SORT_TYPE = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

interface useFetchProductsProps {
  category: categoryType;
  sort: sortType;
}

function useFetchProducts({ category, sort }: useFetchProductsProps) {
  const [products, setProducts] = useState<ProductPageResponse | null>(null);
  const { getData, isLoading } = useFetch<ProductPageResponse>();

  const queryString = createQueryString(category, sort);

  useEffect(() => {
    async function getProducts() {
      const fetchProducts = await getData({
        method: "GET",
        url: `/products?${queryString},`,
        errorType: "PRODUCTS",
      });
      if (fetchProducts) setProducts(fetchProducts);
    }

    getProducts();
  }, [getData, queryString, setProducts]);

  return { isLoading, products };
}

export default useFetchProducts;

function createQueryString(category: categoryType, sort: sortType) {
  const query = {
    ...(category !== "전체" && { category }),
    page: "0",
    size: "20",
    sort: SORT_TYPE[sort],
  };

  const queryString = new URLSearchParams(query).toString();

  return queryString;
}
