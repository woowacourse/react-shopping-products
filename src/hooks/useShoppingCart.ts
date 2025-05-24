import { useCallback, useEffect, useState } from "react";
import fetchCartItems from "../apis/product/fetchCartItems";
import fetchAddProduct from "../apis/product/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/fetchRemoveProduct";

import useErrorMessage from "./useErrorMessage";

import toastMessage from "../utils/toastMessage";
import fetchUpdateCartItemQuantity from "../apis/product/fetchUpdateCartItemQuantity";
import { CartItem } from "../types/FetchCartItemsResult";

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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const [loading, setLoading] = useState(true);
  const { errorMessage, handleErrorMessage } = useErrorMessage();

  const showErrorMessage = useCallback(
    (message: string) => {
      toastMessage({
        message,
        updateMessage: handleErrorMessage,
        resetMessage: () => {
          handleErrorMessage("");
        },
      });
    },
    [handleErrorMessage]
  );

  const handleAddProduct = async (productId: number) => {
    if (cartItems.length === 50) {
      handleErrorMessage("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
      return;
    }

    try {
      await fetchAddProduct({
        params: {
          productId: productId,
          quantity: "1",
        },
      });
      const newCartItems = await getCartItems();
      setCartItems(newCartItems);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
    try {
      const targetCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === productId
      );

      if (!targetCartItem) {
        return;
      }

      await fetchRemoveProduct({
        params: {
          productId: targetCartItem.id,
        },
      });
      const newCartItems = await getCartItems();

      setCartItems(newCartItems);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  const handleIncreaseCartItemQuantity = async (productId: number) => {
    try {
      const PLUS_UNIT = 1;

      const targetCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === productId
      );

      if (!targetCartItem) {
        return;
      }

      const cartItemQuantity = targetCartItem.quantity;
      const stockQuantity = targetCartItem.product.quantity;

      if (cartItemQuantity + PLUS_UNIT > stockQuantity) {
        showErrorMessage("재고 수량을 초과하여 담을 수 없습니다.");
        return;
      }

      await fetchUpdateCartItemQuantity({
        params: {
          id: targetCartItem.id,
          quantity: targetCartItem.quantity + PLUS_UNIT,
        },
      });
      const newCartItems = await getCartItems();

      setCartItems(newCartItems);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  const handleDecreaseCartItemQuantity = async (productId: number) => {
    try {
      const MINUS_UNIT = 1;
      const targetCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === productId
      );

      if (!targetCartItem) {
        return;
      }

      await fetchUpdateCartItemQuantity({
        params: {
          id: targetCartItem.id,
          quantity: targetCartItem.quantity - MINUS_UNIT,
        },
      });
      const newCartItems = await getCartItems();
      setCartItems(newCartItems);
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItems = await getCartItems();

        setCartItems(cartItems);
        setLoading(false);
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }

        showErrorMessage(error.message);
      }
    };

    loadCartItems();
  }, [showErrorMessage]);

  return {
    cartItems,
    loading,
    errorMessage,
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
    handleDecreaseCartItemQuantity,
  };
};

export default useShoppingCart;
