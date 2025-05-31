import { CategoryKey, SortKey } from '../types/selectOptions';

export type ProductsCacheKey = `products-${CategoryKey}-${SortKey}`;
export type CartItemsCacheKey = 'cart-items';
export type CacheKey = ProductsCacheKey | CartItemsCacheKey;

export const createProductsKey = (category: CategoryKey, sort: SortKey): ProductsCacheKey => {
  return `products-${category}-${sort}`;
};

export const createCartItemsKey = (): CartItemsCacheKey => {
  return 'cart-items';
};

export const isProductsKey = (key: string): key is ProductsCacheKey => {
  return key.startsWith('products-');
};

export const isCartItemsKey = (key: string): key is CartItemsCacheKey => {
  return key === 'cart-items';
};
