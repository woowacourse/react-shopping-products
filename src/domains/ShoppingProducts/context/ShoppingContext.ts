import React, { createContext } from "react";
import { CartItemType } from "../apis/types/cartItem";
import { ProductType } from "../apis/types/product";
import { CategoryOption, FilterOption } from "../../../constants";

export type queryKeyType = "cart" | "product";

type PayloadMap = {
  cart: CartItemType;
  product: ProductType;
};

export type ContextState = {
  handleChangeFilter: (value: FilterOption) => void;
  handleChangeCategory: (value: CategoryOption) => void;
  category: CategoryOption;
  filter: FilterOption;
} & {
  [K in keyof PayloadMap]: {
    item: PayloadMap[K][];
    loading: boolean;
    error: string | null;
  };
};

type ProductFilter = {
  category: CategoryOption;
  filter: FilterOption;
};

type BaseAction<K extends keyof PayloadMap> =
  | {
      type: "update";
      queryKey: K;
      payload?: ProductFilter;
    }
  | { type: "success"; queryKey: K; payload: PayloadMap[K][] }
  | { type: "error"; queryKey: K; payload: string };

export type ContextAction = {
  [K in keyof PayloadMap]: BaseAction<K>;
}[keyof PayloadMap];

export const ShoppingContext = createContext<
  (ContextState & { dispatch: React.Dispatch<ContextAction> }) | null
>(null);
