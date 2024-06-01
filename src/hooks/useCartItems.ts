import { getCartItems } from "@/apis/cartItem";
import { ERROR_MESSAGES } from "@/constants/messages";
import useToast from "@/hooks/useToast";
import { CartItems } from "@/types/products";
import { useState, useEffect } from "react";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItems[]>([]);
  const { onAddToast } = useToast();

  const getCartItemList = async () => {
    try {
      const res = await getCartItems();
      setCartItems(res);
    } catch (error) {
      onAddToast(ERROR_MESSAGES.failGetCartItems);
    }
  };

  useEffect(() => {
    getCartItemList();
  }, []);

  return { cartItems, setCartItems };
};

export default useCartItems;
