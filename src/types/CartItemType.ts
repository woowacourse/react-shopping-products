import { ProductType } from "./ProductType";

export type CartItemTypes = {
  id: number;
  quantity: 1;
  product: Omit<ProductType, "isItemInCart">;
};
