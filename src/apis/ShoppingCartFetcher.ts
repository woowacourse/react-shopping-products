import APIClient from '@apis/APIClient';

export async function getCartItems() {
  return await APIClient.get('cart-items');
}

export async function updateCartItemQuantity(
  cartItemId: number,
  quantity: number
) {
  return await APIClient.patch(`cart-items/${cartItemId}`, {
    quantity,
  });
}

export async function deleteCartItem(id: number) {
  return await APIClient.delete(`cart-items/${id}`);
}

export async function addProduct(id: number) {
  return await APIClient.post(`cart-items`, {
    productId: id,
    quantity: 1,
  });
}
