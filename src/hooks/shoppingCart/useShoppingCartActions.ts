import { useCallback } from "react";
import fetchAddProduct from "../../apis/product/cartItems/fetchAddProduct";
import fetchRemoveProduct from "../../apis/product/cartItems/fetchRemoveProduct";
import fetchUpdateCartItemQuantity from "../../apis/product/cartItems/fetchUpdateCartItemQuantity";
import useToast from "../useToast";
import useCartItemsData from "./useShoppingCartData"; // 데이터 관련 훅 import

const QUANTITY_UNIT = 1;

const useShoppingCartActions = () => {
  const { cartItems, updateCartItems, selectedCartItem } = useCartItemsData();
  const { showToast } = useToast();

  const handleAddProduct = useCallback(
    async (productId: number) => {
      try {
        if (cartItems.length === 50) {
          showToast({
            message: "장바구니에 최대 추가 가능한 개수는 50개 입니다.",
            type: "error",
          });
          return;
        }
        await fetchAddProduct({
          params: {
            productId: productId,
            quantity: "1",
          },
        });
        await updateCartItems();
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }
        showToast({ message: error.message, type: "error" });
      }
    },
    [cartItems, showToast, updateCartItems]
  );

  const handleRemoveProduct = useCallback(
    async (productId: number) => {
      try {
        const targetCartItem = selectedCartItem(productId);
        if (!targetCartItem) {
          return;
        }
        await fetchRemoveProduct({
          params: {
            productId: targetCartItem.id,
          },
        });
        await updateCartItems();
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }
        showToast({ message: error.message, type: "error" });
      }
    },
    [selectedCartItem, showToast, updateCartItems]
  );

  const handleIncreaseCartItemQuantity = useCallback(
    async (productId: number) => {
      try {
        const targetCartItem = selectedCartItem(productId);
        if (!targetCartItem) {
          return;
        }
        const cartItemQuantity = targetCartItem.quantity;
        const stockQuantity = targetCartItem.product.quantity;
        if (cartItemQuantity + QUANTITY_UNIT > stockQuantity) {
          showToast({
            message: "재고 수량을 초과하여 담을 수 없습니다.",
            type: "error",
          });
          return;
        }
        await fetchUpdateCartItemQuantity({
          params: {
            id: targetCartItem.id,
            quantity: cartItemQuantity + QUANTITY_UNIT,
          },
        });
        await updateCartItems();
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }
        showToast({ message: error.message, type: "error" });
      }
    },
    [selectedCartItem, showToast, updateCartItems]
  );

  const handleDecreaseCartItemQuantity = useCallback(
    async (productId: number) => {
      try {
        const targetCartItem = selectedCartItem(productId);
        if (!targetCartItem) {
          return;
        }
        await fetchUpdateCartItemQuantity({
          params: {
            id: targetCartItem.id,
            quantity: targetCartItem.quantity - QUANTITY_UNIT,
          },
        });
        await updateCartItems();
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }
        showToast({ message: error.message, type: "error" });
      }
    },
    [selectedCartItem, showToast, updateCartItems]
  );

  return {
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
    handleDecreaseCartItemQuantity,
  };
};

export default useShoppingCartActions;
