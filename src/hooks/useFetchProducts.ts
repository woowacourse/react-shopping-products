import { useEffect, useState } from "react";
import { ProductPageResponse } from "../types/response.types";
import request from "../utils/request";
import { categoryType, sortType } from "../types/index.types";
import { useToast } from "./useToast";

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
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    const basicQuery = {
      page: "0",
      size: "20",
      sort: SORT_TYPE[sort],
    };

    (async () => {
      try {
        const query =
          category === "전체"
            ? basicQuery
            : {
                category: category,
                ...basicQuery,
              };
        const queryString = new URLSearchParams(query).toString();
        const data: ProductPageResponse = await request({
          method: "GET",
          url: `/products?${queryString}`,
        });
        setProducts(data);
      } catch {
        showToast("PRODUCTS");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category, setProducts, sort, showToast]);
  return { isLoading };
}

export default useFetchProducts;
