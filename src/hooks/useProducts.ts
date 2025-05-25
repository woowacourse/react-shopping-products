import { useState, useEffect } from "react";
import getProductList from "../api/ProductListApi";
import { useDataContext } from "../context/DataContext";

export const useProducts = () => {
  const { state, setProductsLoading, setProductsData, setProductsError } =
    useDataContext();

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const {
    data: productList,
    loading: productListLoading,
    error,
  } = state.products;
  const productListErrorMessage = error || "";

  const handleProductErrorMessage = (message: string) => {
    setProductsError(message);
    setTimeout(() => {
      setProductsError(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchProductList = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);

        const rawProductList = await getProductList({
          category: category,
          sort: sort,
        });

        setProductsData(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          setProductsError(error.message);
        }
      }
    };

    fetchProductList();
  }, [category, sort, setProductsLoading, setProductsData, setProductsError]);

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
