import { useEffect } from "react";
import { ProductPageResponse } from "../types/response.types";
import request from "../utils/request";

const basicQuery = {
  page: "0",
  size: "20",
  sort: "price,asc",
};

interface useFetchProductsProps {
  setProducts: (data: ProductPageResponse) => void;
  category: "전체" | "식료품" | "패션잡화";
}

function useFetchProducts({ category, setProducts }: useFetchProductsProps) {
  useEffect(() => {
    (async () => {
      const query =
        category === "전체"
          ? basicQuery
          : {
              category: category,
              page: "0",
              size: "20",
              sort: "price,asc",
            };
      const queryString = new URLSearchParams(query).toString();
      const data: ProductPageResponse = await request({
        method: "GET",
        url: `/products?${queryString}`,
      });
      setProducts(data);
    })();
  }, [category, setProducts]);
}

export default useFetchProducts;
