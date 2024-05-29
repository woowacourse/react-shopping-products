import { useState, useEffect } from "react";
import { getProducts } from "../api";

interface UseProductsResult {
  products: Product[];
}

export default function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const responseData = await getProducts();
      console.log(responseData.content);
      setProducts(responseData.content);
    };

    fetchProducts();
  }, []);

  return { products };
}
