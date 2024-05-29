import { useEffect, useState } from "react";
import { PRODUCTS_ENDPOINT } from "../api/endpoints";

interface UseProductsResult {
  products: ProductProps[];
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(PRODUCTS_ENDPOINT);
      const data = await response.json();
      setProducts(data.content);
    };

    fetchProducts();
  }, []);

  return { products };
}
