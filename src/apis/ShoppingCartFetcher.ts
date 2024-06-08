import APIClient from '@apis/APIClient';
import { CartItem } from '@appTypes/product';

export async function getCartItems(): Promise<CartItem[]> {
  const response = await APIClient.get('cart-items');

  const data = await response.json();

  return data.content;
}

export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
) {
  await APIClient.patch(`cart-items/${cartItemId}`, {
    quantity,
  });
}

export async function deleteCartItem(id: number) {
  await APIClient.delete(`cart-items/${id}`);
}

export async function addProduct(id: number) {
  await APIClient.post(`cart-items`, {
    productId: id,
    quantity: 1,
  });
}
