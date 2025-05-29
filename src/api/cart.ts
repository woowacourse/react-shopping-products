import { CartResponse } from '@/features/ProductList/types/Cart';
import { NewCartItem, ProductQuery } from '@/features/ProductList/types/Product';

import { fetcher } from './fetcher';

export const addCartItem = async ({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) => {
  await fetcher.post({
    endpoint: 'cart-items',
    body: {
      productId,
      quantity,
    },
  });

  const data = await fetcher.get<CartResponse>({
    endpoint: 'cart-items',
  });

  return data.content;
};

export const setCartQuantity = async ({ cartItemId, quantity }: NewCartItem) => {
  await fetcher.patch({
    endpoint: `cart-items/${cartItemId}`,
    body: {
      quantity,
    },
  });

  const data = await fetcher.get<CartResponse>({
    endpoint: 'cart-items',
  });

  return data.content;
};

export const getCartItemList = async ({
  page = 0,
  size = 20,
  sort = '',
}: Partial<ProductQuery> = {}) => {
  const data = await fetcher.get<CartResponse>({
    endpoint: 'cart-items',
    query: { page, size, sort },
  });

  return data.content;
};

export const deleteCartItem = async (cartItemId: number) => {
  await fetcher.delete({ endpoint: `cart-items/${cartItemId}` });

  const data = await fetcher.get<CartResponse>({
    endpoint: 'cart-items',
  });

  return data.content;
};
