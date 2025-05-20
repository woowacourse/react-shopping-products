import { useEffect, useState } from "react";
import { getProducts } from "../apis/product";
import { Content } from "../types/product";

const useProducts = () => {
  const [products, setProducts] = useState<Content[]>();
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [productsErrorMessage, setProductsErrorMessage] = useState("");

  const getProduct = async () => {
    try {
      const data = await getProducts({ page: 0, size: 20 });
      setProducts(data.content);
    } catch (e) {
      if (e instanceof Error) setProductsErrorMessage(e.message);
    }
  };

  useEffect(() => {
    getProduct().finally(() => {
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
