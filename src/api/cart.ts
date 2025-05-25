import { CartResponse } from '@/features/ProductList/types/Cart';
import { NewCartItem, ProductQuery, UpdateCartItem } from '@/features/ProductList/types/Product';

import { ENV } from './env';
import { fetcher } from './fetcher';

export const addCartItem = async ({ productId, quantity }: NewCartItem) => {
  await fetcher.post({
    baseUrl: ENV.BASE_URL + 'cart-items',
    token: ENV.TOKEN,
    body: {
      productId,
      quantity,
    },
  });
};

export const updateCartItem = async ({ cartId, newQuantity }: UpdateCartItem) => {
  await fetcher.patch({
    baseUrl: ENV.BASE_URL + `cart-items/${cartId}`,
    token: ENV.TOKEN,
    body: {
      quantity: newQuantity,
    },
  });
};

export const getCartItemList = async ({
  page = 0,
  size = 20,
  sort = '',
}: Partial<ProductQuery> = {}) => {
  const data = await fetcher.get<CartResponse>({
    baseUrl: ENV.BASE_URL + 'cart-items',
    token: ENV.TOKEN,
    query: { page, size, sort },
  });

  return data.content;
};

export const deleteCartItem = async (cartItemId: number) => {
  await fetcher.delete({ baseUrl: ENV.BASE_URL + `cart-items/${cartItemId}`, token: ENV.TOKEN });
};
