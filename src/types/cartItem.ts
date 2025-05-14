import { ProductItemType } from "./product";

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
}

export interface AddCartItems {
  productId: number;
  quantity: number;
}

export type OnAddToCart = ({ productId, quantity }: AddCartItems) => void;
export type OnRemoveToCart = (id: number) => void;
