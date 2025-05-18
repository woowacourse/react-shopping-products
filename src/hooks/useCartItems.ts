import { useEffect, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, []);

  const cartItemIds =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
    })) ?? [];

  const handleCartItemToggle = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (currentProductId) {
      await CartItemsAPI.delete(currentProductId.cartId);
    } else {
      await CartItemsAPI.post(productId);
    }

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  return {
    cartItems,
    cartItemIds,
    errorMessage,
    setErrorMessage,
    handleCartItemToggle,
  };
};

export default useCartItems;
