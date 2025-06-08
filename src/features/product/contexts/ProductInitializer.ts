import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";

const ProductInitializer = () => {
  const { fetchData } = useProduct();

  useEffect(() => {
    if (fetchData) fetchData();
  }, [fetchData]);

  return null;
};

export default ProductInitializer;
