import { useCallback } from "react";
import fetchCartItems from "../../apis/product/cartItems/fetchCartItems";
import useData from "../useData";

const getCartItems = async () => {
  try {
    const { content } = await fetchCartItems({
      params: {
        page: "0",
        size: "50",
      },
    });

    return content;
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    throw new Error(error.message);
  }
};

const useShoppingCartData = () => {
  const {
    data: cartItems,
    refetch,
    loading,
  } = useData({
    fetcher: getCartItems,
    name: "cartItems",
  });

  const selectedCartItem = useCallback(
    (productId: number) =>
      cartItems.find((cartItem) => cartItem.product.id === productId),
    [cartItems]
  );

  const updateCartItems = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return {
    cartItems,
    loading,
    selectedCartItem,
    updateCartItems,
  };
};

export default useShoppingCartData;
