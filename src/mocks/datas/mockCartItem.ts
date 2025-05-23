import { mockProducts, Product } from './mockProducts';

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const mockCartItems: CartItem[] = [
  { id: 1, quantity: 2, product: mockProducts[0] },
  { id: 2, quantity: 1, product: mockProducts[1] },
  { id: 3, quantity: 3, product: mockProducts[4] },
  { id: 4, quantity: 1, product: mockProducts[5] },
  { id: 5, quantity: 4, product: mockProducts[6] },
  { id: 6, quantity: 1, product: mockProducts[9] },
  { id: 7, quantity: 2, product: mockProducts[16] },
  { id: 8, quantity: 1, product: mockProducts[19] },
];
