import { useEffect, useState } from "react";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";
import { CartItems } from "../apis/types/cartItems";

const useCartItems = () => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    refreshCartItems();
  }, []);

  const refreshCartItems = async () => {
    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      setErrorMessage(response.error);
      return;
    }

    setCartItems(response as CartItems);
  };

  const cartItemInfo =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  const handleAddToCart = async (productId: number) => {
    await CartItemsAPI.post(productId);
    await refreshCartItems();
  };

  const handleQuantityIncrease = async (productId: number) => {
    const currentItem = cartItemInfo.find(
      (item) => item.productId === productId
    );

    if (currentItem) {
      await CartItemsAPI.updateQuantity(
        currentItem.cartId,
        currentItem.quantity + 1
      );
      await refreshCartItems();
    }
  };

  const handleQuantityDecrease = async (productId: number) => {
    const currentItem = cartItemInfo.find(
      (item) => item.productId === productId
    );

    if (currentItem) {
      if (currentItem.quantity === 1) {
        await CartItemsAPI.delete(currentItem.cartId);
      } else {
        await CartItemsAPI.updateQuantity(
          currentItem.cartId,
          currentItem.quantity - 1
        );
      }
      await refreshCartItems();
    }
  };

  return {
    cartItems,
    cartItemInfo,
    errorMessage,
    setErrorMessage,
    handleAddToCart,
    handleQuantityIncrease,
    handleQuantityDecrease,
  };
};

export default useCartItems;
