import { useEffect } from "react";
import { useCart } from "../hooks/useCart";

const CartInitializer = () => {
  const { refetch } = useCart();

  useEffect(() => {
    if (refetch) refetch();
  }, []);

  return null;
};

export default CartInitializer;
