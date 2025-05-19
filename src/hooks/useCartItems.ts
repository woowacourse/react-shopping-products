import { useCallback, useEffect, useState } from "react";
import { deleteCartItems, getCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";
import { useErrorMessage } from "../contexts";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<GetCartItemsResponse>();
  const [isCartItemsLoading, setIsProductsLoading] = useState(true);
  const { setErrorMessage } = useErrorMessage();

  const getCartItem = useCallback(async () => {
    try {
      const data = await getCartItems({ page: 0, size: 20 });
      setCartItems(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  }, [setErrorMessage]);

  const addCart = async (id: number) => {
    try {
      await postCartItems({ quantity: 1, productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const removeCart = async (id: number) => {
    try {
      await deleteCartItems({ productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    }
  };

  const handleCartItem = (type: "add" | "remove", id: number) => {
    if (type === "add") {
      addCart(id);
    } else {
      removeCart(id);
    }
  };

  useEffect(() => {
    getCartItem().then(() => {
      setIsProductsLoading(false);
    });
  }, [getCartItem]);

  const cartItemIds = Object.fromEntries((cartItems?.content || []).map((item) => [item.product.id, item.id]));

  return {
    cartItems,
    isCartItemsLoading,
    handleCartItem,
    cartItemIds,
  };
};

export default useCartItems;
