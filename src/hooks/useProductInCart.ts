import { useEffect, useMemo } from "react";
import { deleteProductInCart, postProductInCart } from "../api";
import { useErrorContext } from "./useErrorContext";
import { useCartItemsContext } from "./useCartItemsContext";

const useProductInCart = (productId: number) => {
  const { showError } = useErrorContext();
  const { cartItems, refreshCartItems } = useCartItemsContext();

  const isProductInCart = useMemo(() => {
    const cartItemIds = cartItems.map((item) => item.product.id);
    return cartItemIds.includes(productId);
  }, [cartItems, productId]);

  const removeProductInCart = async () => {
    const cartItemId = cartItems.find(
      (item) => item.product.id === productId
    )?.id;
    if (!cartItemId) {
      throw new Error("장바구니에 해당 상품이 없어요! 😭");
    }
    await deleteProductInCart(cartItemId);
  };

  const appendProductInCart = async () => {
    await postProductInCart(productId);
  };

  const handleProductInCart = async () => {
    try {
      isProductInCart
        ? await removeProductInCart()
        : await appendProductInCart();
      refreshCartItems();
    } catch (error) {
      if (error instanceof Error) {
        showError(error.message);
      }
    }
  };

  useEffect(() => {
    refreshCartItems();
  }, [refreshCartItems]);

  return {
    isProductInCart,
    handleProductInCart,
  };
};

export default useProductInCart;
