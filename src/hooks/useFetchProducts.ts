import { useEffect } from "react";
import { ProductPageResponse } from "../types/response.types";
import request from "../utils/request";
import { categoryType, sortType } from "../types/index.types";

const SORT_TYPE = {
  "낮은 가격순": "price,desc",
  "높은 가격순": "price,asc",
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
  useEffect(() => {
    const basicQuery = {
      page: "0",
      size: "20",
      sort: SORT_TYPE[sort],
    };

    (async () => {
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
    })();
  }, [category, setProducts, sort]);
}

export default useFetchProducts;
