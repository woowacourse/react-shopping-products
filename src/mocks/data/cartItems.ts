import { mockProducts, Product } from "./products";

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

export let mockCartItems: CartItem[] = [];

export const resetCartItems = () => {
  mockCartItems.length = 0;
  mockCartItems.push(
    {
      id: 1,
      productId: 1,
      quantity: 2,
      product: mockProducts[0],
    },
    {
      id: 2,
      productId: 2,
      quantity: 1,
      product: mockProducts[1],
    }
  );
};
