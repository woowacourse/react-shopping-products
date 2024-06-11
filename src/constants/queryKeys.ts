import { Category, Sort } from '../types/product';

export const QUERY_KEY = {
  products: 'products',
  cartItem: 'cartItem',
};

export const queryKeys = {
  products: (category: Category, sort: Sort) => [QUERY_KEY.products, category, sort] as const,
};
