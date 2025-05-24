import React, { useReducer } from "react";
import { useCartProducts } from "../hooks/useCartProducts";
import { useProducts } from "../hooks/useProducts";
import {
  ContextAction,
  ContextState,
  ShoppingContext,
} from "./ShoppingContext";

const initialValue: ContextState = {
  category: "전체",
  filter: "낮은 가격순",

  cartItemList: [],
  loadingCart: false,
  errorCart: null,

  productList: [],
  loadingProduct: false,
  errorProduct: null,
};

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer<
    React.Reducer<ContextState, ContextAction>
  >(contextReducer, initialValue);

  useProducts(dispatch, state.loadingCart, state.category, state.filter);
  useCartProducts(dispatch, state.loadingCart);

  return (
    <ShoppingContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ShoppingContext.Provider>
  );
}

function contextReducer(
  state: ContextState,
  action: ContextAction
): ContextState {
  switch (action.type) {
    case "updateCartProduct":
      return { ...state, loadingCart: true, errorCart: null };
    case "fetchCartSuccess":
      return {
        ...state,
        cartItemList: action.payload,
        loadingCart: false,
        errorCart: null,
      };
    case "fetchCartFailure":
      return {
        ...state,
        loadingCart: false,
        errorCart: action.payload,
      };
    case "updateProduct":
      return { ...state, loadingProduct: true, errorProduct: null };
    case "fetchProductSuccess":
      return {
        ...state,
        productList: action.payload,
        loadingProduct: false,
        errorProduct: null,
      };
    case "fetchProductFailure":
      return {
        ...state,
        loadingProduct: false,
        errorProduct: action.payload,
      };
    case "changeCategory":
      return {
        ...state,
        category: action.payload,
      };
    case "changeFilter":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}
