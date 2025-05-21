import { useCallback, useEffect, useMemo, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";

type Props = React.Dispatch<React.SetStateAction<string>>;

interface UseCartItemsReturn {
  cartItemsCount: number;
  isProductInCart: (id: number) => boolean;
  handleCartItemToggle: (productId: number) => Promise<void>;
}

const useCartItems = (setErrorMessage: Props): UseCartItemsReturn => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        setErrorMessage(response.error);
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, [setErrorMessage]);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const cartItemsCount = cartItems?.content.length ?? 0;

  const isProductInCart = useCallback(
    (id: number) => cartItemIds.some((item) => item.productId === id),
    [cartItemIds]
  );

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
    cartItemsCount,
    isProductInCart,
    handleCartItemToggle,
  };
};

export default useCartItems;
