import { cartClient } from "@apis/clients/cartClient";
import { Product } from "@apis/products";
import { API_URL } from "@apis/__constants__/apiUrl";

export interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export const getCartItems = async () => {
  const cartItems = await cartClient.get<{ content: CartItem[] }>(API_URL.cartItems);
  return cartItems.content;
};

export const addCartItem = async (productId: number, quantity: number) => {
  await cartClient.post(API_URL.cartItems, { productId, quantity });
};

export const deleteCartItem = async (cartItemId: number) => {
  await cartClient.delete(`${API_URL.cartItems}/${cartItemId}`);
};
