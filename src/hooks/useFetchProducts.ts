import { useEffect, useState } from "react";
import { ProductPageResponse } from "../types/response.types";
import request from "../utils/request";
import { categoryType, sortType } from "../types/index.types";
import { ERROR_TYPE } from "./useError";

const SORT_TYPE = {
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

interface useFetchProductsProps {
  setProducts: (data: ProductPageResponse) => void;
  category: categoryType;
  sort: sortType;
  setErrorTrue: (errorType: ERROR_TYPE) => void;
}

function useFetchProducts({
  category,
  setProducts,
  sort,
  setErrorTrue,
}: useFetchProductsProps) {
  const [isLoading, setIsLoading] = useState(false);

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
                category,
                ...basicQuery,
              };

        const queryString = new URLSearchParams(query).toString();
        const data: ProductPageResponse = await request({
          method: "GET",
          url: `/products?${queryString}`,
        });

        setProducts(data);
      } catch {
        setErrorTrue("PRODUCTS");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [category, setProducts, sort, setErrorTrue]);

  return { isLoading };
}

export default useFetchProducts;
