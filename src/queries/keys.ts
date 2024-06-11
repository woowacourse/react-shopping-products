import { Category, SortType } from '@/types';

export const PRODUCT_KEYS = {
  ALL: (category: Category, sortType: SortType) => ['products', category, sortType],
  DETAIL: (productId: number) => [PRODUCT_KEYS.ALL, productId],
} as const;

export const CART_ITEM_KEYS = {
  ALL: ['cart-item'],
  DETAIL: (cartItemId: number) => [CART_ITEM_KEYS.ALL, cartItemId],
} as const;
