import {
  CartItem,
  ShoppingCartRequestBody,
  ShoppingCartRequest,
} from '../types/cart.type';
import apiRequestWithAuth from './apiRequestWithAuth';

async function getShoppingCart(endpoint: string): Promise<CartItem[]> {
  const response = await apiRequestWithAuth<null>({
    endpoint: `${endpoint}`,
  });
  return response;
}

async function addShoppingCart(request: ShoppingCartRequest): Promise<void> {
  await apiRequestWithAuth<ShoppingCartRequestBody>({
    endpoint: request.endpoint,
    method: 'POST',
    body: request.requestBody,
  });
}

async function deleteShoppingCart(request: ShoppingCartRequest): Promise<void> {
  await apiRequestWithAuth({
    endpoint: `${request.endpoint}/${request.cartItemId}`,
    method: 'DELETE',
  });
}

async function updateShoppingCart(request: ShoppingCartRequest): Promise<void> {
  await apiRequestWithAuth<ShoppingCartRequestBody>({
    endpoint: `${request.endpoint}`,
    method: 'PATCH',
    body: request.requestBody,
  });
}

export {
  addShoppingCart,
  deleteShoppingCart,
  getShoppingCart,
  updateShoppingCart,
};
