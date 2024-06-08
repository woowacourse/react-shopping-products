import {
  CartItem,
  CartResponse,
  PostCartItemRequestBody,
  ProductResponse,
} from '../types/fetch';
import { SortingParam } from '../types/sort';
import { ApiClient, token } from './ApiClient';
import {
  ENDPOINTS_CART,
  ENDPOINTS_PRODUCTS,
  ENDPOINTS_REMOVE_CART,
} from './endpoints';

const apiClient = new ApiClient({
  Authorization: token,
  'Content-Type': 'application/json',
});

export const fetchProducts = async (
  page: number,
  size: number,
  sortings: SortingParam[] = [],
  category: string = '',
) => {
  const results = sortings.map(
    (sorting) => `${sorting.name}%2C${sorting.order}`,
  );
  const sortingParams =
    results.length > 0 ? '&sort=' + results.join('&sort=') : '';
  const categoryParam = category ? `&category=${category}` : '';

  const url = `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}${sortingParams}${categoryParam}`;

  return await apiClient.get<ProductResponse>(url);
};

export const postAddItems = async (id: number) => {
  return await apiClient.post(`${ENDPOINTS_CART}`, {
    productId: id,
    quantity: 1,
  } satisfies PostCartItemRequestBody);
};

export const deleteCartItem = async (cartId: number) => {
  return await apiClient.delete(`${ENDPOINTS_REMOVE_CART(cartId)}`);
};

export const fetchCartItems = async () => {
  return await apiClient.get<CartResponse>(ENDPOINTS_CART);
};
