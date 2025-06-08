import { useEffect } from "react";
import { useCart } from "../hooks/useCart";

const CartInitializer = () => {
  const { fetchData } = useCart();

  useEffect(() => {
    if (fetchData) fetchData();
  }, [fetchData]);

  return null;
};

export default CartInitializer;
