import apiClient from './apiClient';

interface AddCartItemsProps {
  productId: number;
  quantity: number;
}

export const getCartItems = async () => {
  const data = await apiClient({
    method: 'GET',
    URI: '/cart-items',
  });
  return data.content;
};

export const addCartItems = async (cartItem: AddCartItemsProps) => {
  await apiClient({ method: 'POST', URI: '/cart-items', body: cartItem });
};

export const removeCartItems = async (id: number) => {
  await apiClient({ method: 'DELETE', URI: `/cart-items/${id}` });
};
