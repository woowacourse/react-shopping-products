import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

interface UseProductsResult {
  products: ProductProps[];
  isLoading: boolean;
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_ENDPOINT);
      const data = await response.json();
      setProducts(data.content);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  return { products, isLoading };
}
