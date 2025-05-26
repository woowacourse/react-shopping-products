import { useCallback } from "react";
import fetchCartItems from "../apis/product/cartItems/fetchCartItems";
import fetchAddProduct from "../apis/product/cartItems/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/cartItems/fetchRemoveProduct";

import fetchUpdateCartItemQuantity from "../apis/product/cartItems/fetchUpdateCartItemQuantity";

import useData from "./useData";
import useToast from "./useToast";

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

const useShoppingCart = () => {
  const {
    data: cartItems,
    refetch,
    loading,
  } = useData({
    fetcher: getCartItems,
    name: "cartItems",
  });

  const { showToast } = useToast();

  const selectedCartItem = useCallback(
    (productId: number) =>
      cartItems.find((cartItem) => cartItem.product.id === productId),
    [cartItems]
  );

  const updateCartItems = useCallback(async () => {
    await refetch();
  }, [refetch]);

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

  const QUANTITY_UNIT = 1;

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
            quantity: targetCartItem.quantity + QUANTITY_UNIT,
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
    cartItems,
    loading,
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
    handleDecreaseCartItemQuantity,
  };
};

export default useShoppingCart;
