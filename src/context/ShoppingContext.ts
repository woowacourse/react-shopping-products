import { CategoryOption, FilterOption } from "../constants";
import { CartItemType } from "../types/cartItem";
import { ProductType } from "../types/product";
import React, { createContext } from "react";

export interface ContextState {
  category: CategoryOption;
  filter: FilterOption;

  cartItemList: CartItemType[];
  loadingCart: boolean;
  errorCart: string | null;

  productList: ProductType[];
  loadingProduct: boolean;
  errorProduct: string | null;
}

export type ContextAction =
  | { type: "updateCartProduct" }
  | { type: "fetchCartSuccess"; payload: CartItemType[] }
  | { type: "fetchCartFailure"; payload: string }
  | { type: "updateProduct" }
  | { type: "fetchProductSuccess"; payload: ProductType[] }
  | { type: "fetchProductFailure"; payload: string }
  | { type: "changeCategory"; payload: CategoryOption }
  | { type: "changeFilter"; payload: FilterOption };

export const ShoppingContext = createContext<
  (ContextState & { dispatch: React.Dispatch<ContextAction> }) | null
>(null);
