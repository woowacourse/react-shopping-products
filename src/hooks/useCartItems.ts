import { useCallback, useEffect, useState } from "react";
import { deleteCartItems, getCartItems, postCartItems } from "../apis/cartItem";
import { GetCartItemsResponse } from "../types/cartItem";
import { useErrorMessage, useLoading } from "../contexts";

const useCartItems = () => {
  const [cartItemsResponse, setCartItemsResponse] = useState<GetCartItemsResponse>();
  const { setErrorMessage } = useErrorMessage();
  const { setIsLoading } = useLoading();

  const getCartItem = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCartItems({ page: 0, size: 20 });
      setCartItemsResponse(data);
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

  const handleCartItem = (type: "add" | "patch" | "remove", id: number) => {
    if (type === "add") return addCart(id);
    return removeCart(id);
  };

  useEffect(() => {
    getCartItem();
  }, [getCartItem]);

  // productId : {cartItemId: , quantity: }
  const cartItemsByProductId = Object.fromEntries(
    (cartItemsResponse?.content || []).map((item) => [
      item.product.id,
      { cartItemId: item.id, quantity: item.quantity },
    ]),
  );

  return {
    cartItems: cartItemsResponse?.content,
    handleCartItem,
    cartItemsByProductId,
  };
};

export default useCartItems;
