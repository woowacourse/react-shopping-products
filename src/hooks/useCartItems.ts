import { useEffect, useState } from "react";
import { deleteCartItems, getCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<GetCartItemsResponse>();
  const [isCartItemsLoading, setIsProductsLoading] = useState(true);
  const [cartItemsErrorMessage, setCartItemsErrorMessage] = useState("");

  const getCartItem = async () => {
    try {
      const data = await getCartItems({ page: 0, size: 20 });
      setCartItems(data);
    } catch (e) {
      if (e instanceof Error) setCartItemsErrorMessage(e.message);
    }
  };

  const addCart = async (id: number) => {
    try {
      await postCartItems({ quantity: 1, productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setCartItemsErrorMessage(e.message);
    }
  };

  const removeCart = async (id: number) => {
    try {
      await deleteCartItems({ productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setCartItemsErrorMessage(e.message);
    }
  };

  useEffect(() => {
    getCartItem().then(() => {
      setIsProductsLoading(false);
    });
  }, []);

  const cartItemIds = cartItems && Object.fromEntries(cartItems?.content.map((item) => [item.product.id, item.id]));

  return {
    cartItems,
    isCartItemsLoading,
    cartItemsErrorMessage,
    setCartItemsErrorMessage,
    addCart,
    removeCart,
    cartItemIds,
  };
};

export default useCartItems;
