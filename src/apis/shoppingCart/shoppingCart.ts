import APIClient from '@apis/APIClient';
import { getCartItemsEndpoint } from '@apis/shoppingCart/shoppingCart.util';
import { CartItem } from '@appTypes/product';
import { InfinityScrollResponse } from '@appTypes/response';

import { INIT_PAGE } from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';

export const getCartItems = async (
  { page, size } = { page: INIT_PAGE, size: 20 }
): Promise<InfinityScrollResponse<CartItem[]>> => {
  const prevResponse = await APIClient.get(getCartItemsEndpoint({ page, size }));

  APIClient.validateResponse(prevResponse, '장바구니 목록을 불러오는데 실패했습니다.');

  const prevData = await prevResponse.json();

  const response = await APIClient.get(
    getCartItemsEndpoint({ page, size: prevData.totalElements })
  );

  APIClient.validateResponse(response, '장바구니 목록을 불러오는데 실패했습니다.');

  const data = await response.json();

  return data;
};

export const deleteCartItem = async (id: number) => {
  const response = await APIClient.delete(`cart-items/${id}`);

  APIClient.validateResponse(response, '장바구니 아이템을 삭제하지 못했습니다.');
};

export const addShoppingCartItem = async (productId: number) => {
  const response = await APIClient.post('cart-items', { productId, quantity: 1 });

  APIClient.validateResponse(response, '장바구니에 물건을 담지 못했습니다.');
};

export const updateCartItemQuantity = async ({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) => {
  const response = await APIClient.patch(`cart-items/${id}`, { quantity });

  APIClient.validateResponse(response, '장바구니 물품 수량을 변경하지 못했습니다.');
};
