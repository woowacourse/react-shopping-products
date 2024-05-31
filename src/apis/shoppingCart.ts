import APIClient from '@apis/APIClient';
import { CartItem } from '@appTypes/product';

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await APIClient.get('cart-items');

  APIClient.validateResponse(response, '장바구니 목록을 불러오는데 실패했습니다.');

  const data = await response.json();

  return data.content;
};

export const deleteCartItem = async (id: number) => {
  const response = await APIClient.delete(`cart-items/${id}`);

  APIClient.validateResponse(response, '장바구니 아이템을 삭제하지 못했습니다.');
};

export const addProduct = async (id: number) => {
  const response = await APIClient.post(`cart-items`, { productId: id, quantity: 1 });

  APIClient.validateResponse(response, '장바구니에 물건을 담지 못했습니다.');
};
