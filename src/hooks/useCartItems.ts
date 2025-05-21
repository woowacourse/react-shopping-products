import { useEffect, useReducer, useState } from "react";

import fetchCartItems from "../apis/product/fetchCartItems";
import fetchAddProduct from "../apis/product/fetchAddProduct";
import fetchRemoveProduct from "../apis/product/fetchRemoveProduct";

import { useErrorMessageContext } from "../context/ErrorMessageContext";

import CartItem from "../types/CartItem";

const INIT_STATE = {
  isLoading: false,
  isFetching: false,
  isSuccess: false,
  isFail: false,
};

const ACTION_TYPE = {
  FETCH_LOADING: "FETCH_LOADING",
  FETCH_FETCHING: "FETCH_FETCHING",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_FAIL: "FETCH_FAIL",
};

const reducer = (state: typeof INIT_STATE, action: { type: string }) => {
  switch (action.type) {
    case ACTION_TYPE.FETCH_LOADING:
      return {
        isLoading: true,
        isFetching: false,
        isSuccess: false,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_FETCHING:
      return {
        isLoading: false,
        isFetching: true,
        isSuccess: false,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_SUCCESS:
      return {
        isFetching: false,
        isLoading: false,
        isSuccess: true,
        isFail: false,
      };
    case ACTION_TYPE.FETCH_FAIL:
      return {
        isFetching: false,
        isLoading: false,
        isSuccess: false,
        isFail: true,
      };
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
    dispatch({ type: ACTION_TYPE.FETCH_LOADING });
    fetchData();
  }, []);

  const fetchData = async () => {
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
    dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
    if (cartItems.length >= 50) {
      handleErrorMessage("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
      return;
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await fetchAddProduct({
        method: "POST",
        params: {
          productId: id,
          quantity: "1",
        },
      });
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch {
      handleErrorMessage("장바구니에 상품을 추가하는데 실패했습니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      handleErrorMessage("상품 목록을 불러오는데 실패했습니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }

    dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
  };

  const removeCartItem = async (id: string) => {
    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      const cartItem = cartItems.find((item) => item.productId === id);

      if (!cartItem) {
        dispatch({ type: ACTION_TYPE.FETCH_FAIL });
        throw new Error("삭제할 상품을 찾을 수 없습니다.");
      }

      await fetchRemoveProduct({
        method: "DELETE",
        params: {
          productId: cartItem.cartId,
        },
      });
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      error instanceof Error &&
        handleErrorMessage(
          error.message || "장바구니에서 상품을 삭제하는데 실패했습니다."
        );
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }

    try {
      dispatch({ type: ACTION_TYPE.FETCH_FETCHING });
      await fetchData();
      dispatch({ type: ACTION_TYPE.FETCH_SUCCESS });
    } catch (error) {
      handleErrorMessage("상품 목록을 불러오는데 실패했습니다.");
      dispatch({ type: ACTION_TYPE.FETCH_FAIL });
    }
  };

  return { state, cartItems, addCartItem, removeCartItem };
};

export default useCartItems;
