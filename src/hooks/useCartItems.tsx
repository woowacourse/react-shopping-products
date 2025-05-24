import { useEffect, useMemo, useState } from "react";
import { CartItems } from "../types/cartItems";
import { CartItemsAPI } from "../apis/cartItems";
import { isErrorResponse } from "../utils/typeGuard";
import useToast from "./useToast";
import { TOAST_TYPES } from "../constants/toast";

interface UseCartItemsReturn {
  cartItems: CartItems | null;
  cartItemsCount: number;
  quantityByProductId: (productId: number) => number;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  increaseItemQuantity: (productId: number) => Promise<void>;
  addProductInCart: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
}

const useCartItems = (): UseCartItemsReturn => {
  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const { showToast } = useToast();

  console.log("cartItems: ", cartItems);

  useEffect(() => {
    (async () => {
      const response = await CartItemsAPI.get();

      if (isErrorResponse(response)) {
        showToast({
          message: response.error,
          type: TOAST_TYPES.ERROR,
        });
        return;
      }

      setCartItems(response as CartItems);
    })();
  }, []);

  const cartItemIds = useMemo(
    () =>
      cartItems?.content.map((productInfo) => ({
        cartId: productInfo.id,
        productId: productInfo.product.id,
      })) ?? [],
    [cartItems?.content]
  );

  const cartItemsCount = cartItems?.content.length ?? 0;
  const allQuantities =
    cartItems?.content.map((productInfo) => ({
      cartId: productInfo.id,
      productId: productInfo.product.id,
      quantity: productInfo.quantity,
    })) ?? [];

  const quantityByProductId = (productId: number) =>
    allQuantities.find((item) => item.productId === productId)?.quantity ?? 0;

  const totalPriceInCart =
    cartItems?.content.reduce((total, productInfo) => {
      const price = productInfo.product?.price ?? 0;
      const quantity = productInfo.quantity ?? 0;
      return total + price * quantity;
    }, 0) ?? 0;

  const decreaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.patch(
      currentProductId.cartId,
      quantityByProductId(currentProductId.productId) - 1
    );

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast({
        message: response.error,
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setCartItems(response as CartItems);
  };

  const increaseItemQuantity = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.patch(
      currentProductId.cartId,
      quantityByProductId(currentProductId.productId) + 1
    );

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast({
        message: response.error,
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setCartItems(response as CartItems);
  };

  const addProductInCart = async (productId: number) => {
    await CartItemsAPI.post(productId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast({
        message: response.error,
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setCartItems(response as CartItems);
  };

  const deleteProductInCart = async (productId: number) => {
    const currentProductId = cartItemIds.find(
      (productInfo) => productInfo.productId === productId
    );

    if (!currentProductId) return;
    await CartItemsAPI.delete(currentProductId.cartId);

    const response = await CartItemsAPI.get();

    if (isErrorResponse(response)) {
      showToast({
        message: response.error,
        type: TOAST_TYPES.ERROR,
      });
      return;
    }

    setCartItems(response as CartItems);
  };

  return {
    cartItems,
    cartItemsCount,
    quantityByProductId,
    decreaseItemQuantity,
    increaseItemQuantity,
    addProductInCart,
    deleteProductInCart,
    totalPriceInCart,
  };
};

export default useCartItems;
