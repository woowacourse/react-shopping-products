import { useCallback, useEffect, useState } from "react";
import fetchCartItems from "../apis/product/fetchCartItems";
import fetchAddProduct from "../apis/product/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/fetchRemoveProduct";

import useErrorMessage from "./useErrorMessage";

import toastMessage from "../utils/toastMessage";
import fetchUpdateCartItemQuantity from "../apis/product/fetchUpdateCartItemQuantity";

const getCartItems = async () => {
  try {
    const { content } = await fetchCartItems({
      params: {
        page: "0",
        size: "50",
      },
    });

    return content.map((item) => ({
      ...item,
      id: item.id.toString(),
      product: { ...item.product, id: item.product.id.toString() },
    }));
  } catch (error) {
    if (!(error instanceof Error)) {
      throw error;
    }
    throw new Error(error.message);
  }
};

const useShoppingCart = () => {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );
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

  const handleAddProduct = async (productId: string) => {
    if (selectedProductIdList.length === 50) {
      handleErrorMessage("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
      return;
    }

    setSelectedProductIdList((prevIdList) => {
      const newIdListSet = new Set([...prevIdList, productId]);
      return Array.from(newIdListSet);
    });

    try {
      await fetchAddProduct({
        params: {
          productId: productId,
          quantity: "1",
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    setSelectedProductIdList((prevIdList) => {
      return prevIdList.filter((prevId) => prevId !== productId);
    });

    try {
      const { content } = await fetchCartItems({
        params: {
          page: "0",
          size: "50",
        },
      });

      const targetCartItem = content.find(
        (cartItem) => cartItem.product.id.toString() === productId
      );

      if (!targetCartItem) {
        return;
      }

      await fetchRemoveProduct({
        params: {
          productId: targetCartItem.id,
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      showErrorMessage(error.message);
    }
  };

  const handleIncreaseCartItemQuantity = async (productId: string) => {
    try {
      const PLUS_UNIT = 1;
      const cartItems = await getCartItems();
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
        const { content } = await fetchCartItems({
          params: {
            page: "0",
            size: "50",
          },
        });

        setSelectedProductIdList(
          content.map((item) => item.product.id.toString())
        );
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
    selectedProductIdList,
    loading,
    errorMessage,
    handleAddProduct,
    handleRemoveProduct,
    handleIncreaseCartItemQuantity,
  };
};

export default useShoppingCart;
