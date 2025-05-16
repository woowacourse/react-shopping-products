import { useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import { GetProductResponse } from "../types";

const useProducts = () => {
  const [products, setProducts] = useState<GetProductResponse>();
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsErrorMessage, setProductsErrorMessage] = useState("");

  const getProduct = async () => {
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProducts(data);
    } catch (e) {
      if (e instanceof Error) setProductsErrorMessage(e.message);
    }
  };

  useEffect(() => {
    getProduct().then(() => {
      setIsProductsLoading(false);
    });
  }, []);

  return {
    products,
    isProductsLoading,
    productsErrorMessage,
    setProductsErrorMessage,
  };
};

export default useProducts;
