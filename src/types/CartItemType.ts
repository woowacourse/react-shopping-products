import { ProductTypes } from './ProductTypes';

export type CartItemTypes = {
  id: number;
  quantity: 1;
  product: Omit<ProductTypes, 'isItemInCart'>;
};
