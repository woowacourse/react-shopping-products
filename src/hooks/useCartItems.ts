import { useCallback, useEffect, useState } from "react";
import { deleteCartItems, getCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";
import { useErrorMessage, useLoading } from "../contexts";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<GetCartItemsResponse>();
  const { setErrorMessage } = useErrorMessage();
  const { setIsLoading } = useLoading();

  const getCartItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCartItems({ page: 0, size: 20 });
      setCartItems(data);
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  }, [setErrorMessage, setIsLoading]);

  const addCart = async (id: number) => {
    setIsLoading(true);
    try {
      await postCartItems({ quantity: 1, productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeCart = async (id: number) => {
    setIsLoading(true);
    try {
      await deleteCartItems({ productId: id });
      await getCartItem();
    } catch (e) {
      if (e instanceof Error) setErrorMessage(e.message);
    } finally {
      setIsLoading(false);
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
    getCartItem();
  }, [getCartItem]);

  const cartItemIds = Object.fromEntries((cartItems?.content || []).map((item) => [item.product.id, item.id]));

  return {
    cartItems,
    handleCartItem,
    cartItemIds,
  };
};

export default useCartItems;
