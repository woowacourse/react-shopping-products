import { useEffect, useReducer, useState } from "react";

import fetchCartItems from "../apis/product/fetchCartItems";
import fetchAddProduct from "../apis/product/fetchAddProduct";

import CartItem from "../types/CartItem";
import fetchRemoveProduct from "../apis/product/fetchRemoveProduct";
import { useErrorMessageContext } from "../context/ErrorMessageContext";

const INIT_STATE = {
  isLoading: false,
  isSuccess: false,
  isFail: false,
};

const ACTION_TYPE = {
  FETCH_LOADING: "FETCH_LOADING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",
};

const reducer = (state: typeof INIT_STATE, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_LOADING:
      return { isLoading: true, isSuccess: false, isFail: false };
    case ACTION_TYPE.FETCH_SUCCESS:
      return { isLoading: false, isSuccess: true, isFail: false };
    case ACTION_TYPE.FETCH_FAIL:
      return { isLoading: false, isSuccess: false, isFail: true };
    default:
      return state;
  }
};

type selectedItemID = {
  cartId: string;
  productId: string;
};

const useCartItems = () => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const [cartItems, setCartItems] = useState<selectedItemID[]>([]);
  const { handleErrorMessage } = useErrorMessageContext();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    try {
      const { content } = await fetchCartItems({
        method: "GET",
        params: {
          page: "0",
          size: "50",
        },
      });
      setCartItems(
        content.map((cartItem: CartItem) => ({
          productId: cartItem.product.id.toString(),
          cartId: cartItem.id.toString(),
        }))
      );
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      handleErrorMessage("장바구니 목록을 불러오는데 실패했습니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }
  };

  const addCartItem = async (id: string) => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    try {
      if (cartItems.length >= 50) {
        throw new Error("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
      }

      await fetchAddProduct({
        method: "POST",
        params: {
          productId: id,
          quantity: "1",
        },
      });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      if (error.message === "장바구니에 최대 추가 가능한 개수는 50개 입니다.") {
        handleErrorMessage(error.message);
      }

      handleErrorMessage("장바구니에 상품을 추가하는데 실패했습니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }
  };

  const removeCartItem = async (id: string) => {
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    try {
      const cartItem = cartItems.find((item) => item.productId === id);
      if (!cartItem) {
        throw new Error("삭제할 상품을 찾을 수 없습니다.");
      }

      await fetchRemoveProduct({
        method: "DELETE",
        params: {
          productId: cartItem.cartId,
        },
      });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      error instanceof Error &&
        handleErrorMessage(
          error.message || "장바구니에서 상품을 삭제하는데 실패했습니다."
        );
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }
  };

  return { state, cartItems, addCartItem, removeCartItem };
};

export default useCartItems;
