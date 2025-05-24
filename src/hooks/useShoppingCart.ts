import { useCallback, useEffect, useState } from "react";
import fetchCartItems from "../apis/product/cartItems/fetchCartItems";
import fetchAddProduct from "../apis/product/cartItems/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/cartItems/fetchRemoveProduct";

import useErrorMessage from "./useErrorMessage";

import toastMessage from "../utils/toastMessage";
import fetchUpdateCartItemQuantity from "../apis/product/cartItems/fetchUpdateCartItemQuantity";
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

  const selectedCartItem = (productId: number) =>
    cartItems.find((cartItem) => cartItem.product.id === productId);

  const updateCartItems = async () => {
    const newCartItems = await getCartItems();
    setCartItems(newCartItems);
  };

  const handleAddProduct = async (productId: number) => {
    try {
      if (cartItems.length === 50) {
        showErrorMessage("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
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

      showErrorMessage(error.message);
    }
  };

  const handleRemoveProduct = async (productId: number) => {
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

      showErrorMessage(error.message);
    }
  };

  const QUANTITY_UNIT = 1;

  const handleIncreaseCartItemQuantity = async (productId: number) => {
    try {
      const targetCartItem = selectedCartItem(productId);

      if (!targetCartItem) {
        return;
      }

      const cartItemQuantity = targetCartItem.quantity;
      const stockQuantity = targetCartItem.product.quantity;

      if (cartItemQuantity + QUANTITY_UNIT > stockQuantity) {
        showErrorMessage("재고 수량을 초과하여 담을 수 없습니다.");
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

      showErrorMessage(error.message);
    }
  };

  const handleDecreaseCartItemQuantity = async (productId: number) => {
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

      showErrorMessage(error.message);
    }
  };

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        await updateCartItems();
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
