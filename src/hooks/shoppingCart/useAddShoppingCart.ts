import { useCallback } from "react";
import { useShoppingCartContext } from "../../contexts/shoppingCart/useShoppingCartContext";
import addShoppingCart from "../../APIs/shoppingCart/addShoppingCart";

export function useAddShoppingCart(productId: number) {
  const {
    cartItems,
    handleCartItemChange,
    handleShoppingCartError,
    handleIsShoppingLoading,
  } = useShoppingCartContext();

  const handleAdd = useCallback(async () => {
    if (cartItems.length >= 50) {
      handleShoppingCartError({
        isError: true,
        errorMessage: "장바구니 최대 50개까지 담을 수 있습니다.",
      });
      return;
    }

    handleIsShoppingLoading(true);
    try {
      const endpoint = "/cart-items";
      const requestBody = { productId, quantity: 1 };
      const newCartItems = await addShoppingCart({ endpoint, requestBody });
      handleCartItemChange(newCartItems);
    } catch {
      handleShoppingCartError({
        isError: true,
        errorMessage: "상품을 장바구니에 추가하지 못했습니다.",
      });
    } finally {
      handleIsShoppingLoading(false);
    }
  }, [
    productId,
    cartItems.length,
    handleCartItemChange,
    handleShoppingCartError,
    handleIsShoppingLoading,
  ]);

  return { handleAdd };
}
