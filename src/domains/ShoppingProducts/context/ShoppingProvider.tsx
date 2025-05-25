import React, { useReducer } from "react";
import { useCartProducts } from "../hooks/useCartProducts";
import { useFilter } from "../hooks/useFilter";
import { useProducts } from "../hooks/useProducts";
import {
  ContextAction,
  ContextState,
  ShoppingContext,
} from "./ShoppingContext";

const initialValue: ContextState = {
  handleChangeFilter: () => {},
  handleChangeCategory: () => {},
  cart: { item: [], loading: false, error: null },
  product: { item: [], loading: false, error: null },
};

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer<
    React.Reducer<ContextState, ContextAction>
  >(contextReducer, initialValue);

  const { filter, category, handleChangeFilter, handleChangeCategory } =
    useFilter(dispatch);
  state.handleChangeFilter = handleChangeFilter;
  state.handleChangeCategory = handleChangeCategory;

  useProducts(dispatch, state.product.loading, category, filter);
  useCartProducts(dispatch, state.cart.loading);

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
  const key = action.queryKey;

  switch (action.type) {
    case "update":
      return {
        ...state,
        [key]: {
          item: state[key].item,
          loading: true,
          error: null,
        },
      };
    case "success":
      return {
        ...state,
        [key]: {
          item: action.payload,
          loading: false,
          error: null,
        },
      };
    case "error":
      return {
        ...state,
        [key]: {
          item: state[key].item,
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}
