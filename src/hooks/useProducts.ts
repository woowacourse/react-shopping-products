import { useState, useEffect } from "react";
import { ResponseProduct } from "../api/types";
import getProductList from "../api/ProductListApi";

export const useProducts = () => {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [productListLoading, setProductListLoading] = useState(true);
  const [productListErrorMessage, setProductListErrorMessage] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const handleProductErrorMessage = (message: string) => {
    setProductListErrorMessage("");
    setTimeout(() => {
      setProductListErrorMessage(message);
    }, 10);
  };

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setProductListLoading(true);
        const rawProductList = await getProductList({
          category: category,
          sort: sort,
        });
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          handleProductErrorMessage(error.message);
        }
      } finally {
        setProductListLoading(false);
      }
    };
    fetchProductList();
  }, [category, sort]);

  return {
    productList,
    productListLoading,
    productListErrorMessage,
    category,
    sort,

    setCategory,
    setSort,
    setErrorMessage: handleProductErrorMessage,
  };
};
