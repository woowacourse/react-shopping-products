import {
  CartItem,
  ShoppingCartRequestBody,
  ShoppingCartRequest,
  ShoppingCartResponse,
} from '../types/cart.type';
import apiRequest from './apiRequestWithAuth';

async function getShoppingCart(endpoint: string): Promise<CartItem[]> {
  const response = await apiRequest<null, ShoppingCartResponse>({
    endpoint: `${endpoint}`,
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
