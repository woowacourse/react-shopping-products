import {
  CartItem,
  ShoppingCartRequestBody,
  ShoppingCartRequest,
  ShoppingCartResponse,
} from '../types/product.type';
import apiRequest from './apiRequestWithAuth';

const PARAMS = new URLSearchParams({ page: '0', size: '50' }).toString();

async function getShoppingCart(endpoint: string): Promise<CartItem[]> {
  const response = await apiRequest<null, ShoppingCartResponse>({
    endpoint: `${endpoint}?${PARAMS}`,
  });
  return response.content;
}

async function addShoppingCart(
  request: ShoppingCartRequest
): Promise<CartItem[]> {
  await apiRequest<ShoppingCartRequestBody>({
    endpoint: request.endpoint,
    method: 'POST',
    body: request.requestBody,
  });

  return await getShoppingCart(request.endpoint);
}

async function deleteShoppingCart(
  request: ShoppingCartRequest
): Promise<CartItem[]> {
  await apiRequest<null>({
    endpoint: `${request.endpoint}/${request.cartItemId}`,
    method: 'DELETE',
  });

  return await getShoppingCart(request.endpoint);
}

export { addShoppingCart, deleteShoppingCart, getShoppingCart };
