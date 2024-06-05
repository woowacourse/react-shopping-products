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

export interface CreateCartItemParams {
  productId: number;
  quantity: number;
}

export const createCartItem = async ({ productId, quantity }: CreateCartItemParams) => {
  await cartClient.post(API_URL.cartItems, { productId, quantity });
};

export const deleteCartItem = async (cartItemId: number) => {
  try {
    await cartClient.delete(`${API_URL.cartItems}/${cartItemId}`);
  } catch {
    throw new Error(
      "장바구니 상품을 삭제하는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
    );
  }
};
