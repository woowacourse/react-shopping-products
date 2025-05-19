import { ERROR_MESSAGE } from '../constants/errorMessage';
import { CartResponse } from '../types/product';
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
  const response = await fetch(
    `${
      import.meta.env.VITE_API_BASE_URL
    }/cart-items?page=${page}&size=${size}&sort=${sortBy}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || ERROR_MESSAGE.CART_FETCH_FAIL);
  }

  const data = await response.json();
  return data;
};

export const addCart = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText || `${ERROR_MESSAGE.CART_PRODUCT_ADD_FAIL}: ${response.status}`
    );
  }

  return response;
};

export const removeCart = async (id: number) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/cart-items/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Basic ${import.meta.env.VITE_API_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      errorText ||
        `${ERROR_MESSAGE.CART_PRODUCT_REMOVE_FAIL}: ${response.status}`
    );
  }

  return response;
};
