import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";

const ProductInitializer = () => {
  const { refetch } = useProduct();

  useEffect(() => {
    if (refetch) refetch();
  }, []);

  return null;
};

export default ProductInitializer;
