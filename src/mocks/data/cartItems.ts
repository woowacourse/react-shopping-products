import { Product } from "./products";

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

export let mockCartItems: CartItem[] = [];

export const resetCartItems = () => {
  mockCartItems = [];
};
