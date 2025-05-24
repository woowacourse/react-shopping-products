import React, { createContext, useContext, useReducer } from "react";
import { CategoryOption, FilterOption } from "../../constants";
import { CartItemType } from "../../types/cartItem";
import { ProductType } from "../../types/product";
import { useCartProducts } from "../useCartProducts";
import { useProducts } from "../useProducts";

const ShoppingContext = createContext<
  (ContextState & { dispatch: React.Dispatch<ContextAction> }) | null
>(null);

export type ContextAction =
  | { type: "updateCartProduct" }
  | { type: "fetchCartSuccess"; payload: CartItemType[] }
  | { type: "fetchCartFailure"; payload: string }
  | { type: "updateProduct" }
  | { type: "fetchProductSuccess"; payload: ProductType[] }
  | { type: "fetchProductFailure"; payload: string }
  | { type: "changeCategory"; payload: CategoryOption }
  | { type: "changeFilter"; payload: FilterOption };

interface ContextState {
  category: CategoryOption;
  filter: FilterOption;

  cartItemList: CartItemType[];
  loadingCart: boolean;
  errorCart: string | null;

  productList: ProductType[];
  loadingProduct: boolean;
  errorProduct: string | null;
}

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

export function useShoppingContext() {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useCart must be used within a ShoppingProductsProvider");
  }
  return context;
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
