import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CartResponse } from '../types/product';
import { fetchAPI } from './fetchAPI';
interface getCartItemProps {
  page: number;
  size: number;
  sortBy: string;
}

export const getCartItem = async ({
  page,
  size,
  sortBy,
}: getCartItemProps): Promise<CartResponse> => {
  const url = `${
    import.meta.env.VITE_API_BASE_URL
  }/cart-items?page=${page}&size=${size}&sort=${sortBy}`;

  const response = await fetchAPI({
    url: url,
    options: { method: 'GET' },
    errorMessage: ERROR_MESSAGE.CART_FETCH_FAIL,
  });

  const data = await response.json();
  return data;
};

export const addCart = async (id: number) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/cart-items`;

  const response = await fetchAPI({
    url: url,
    options: {
      method: 'POST',
      body: { productId: id, quantity: 1 },
    },
    errorMessage: ERROR_MESSAGE.CART_PRODUCT_ADD_FAIL,
  });

  return response;
};

export const removeCart = async (id: number) => {
  const url = `${import.meta.env.VITE_API_BASE_URL}/cart-items/${id}`;

  const response = await fetchAPI({
    url: url,
    options: { method: 'DELETE' },
    errorMessage: ERROR_MESSAGE.CART_PRODUCT_REMOVE_FAIL,
  });

  return response;
};
