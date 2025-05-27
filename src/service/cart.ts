import { cartApi } from '../api/cart';

export const cartService = {
  async getCartItems() {
    return await cartApi.getCartItems();
  },

  async removeCartItem(cartId: number) {
    await cartApi.removeFromCart(cartId);
    return await cartApi.getCartItems();
  },

  async addCartItem(productId: number) {
    await cartApi.addToCart(productId);
    return await cartApi.getCartItems();
  },

  async patchCartItemQuantity(cartItemId: number, quantity: number) {
    await cartApi.patchCartItemQuantity(cartItemId, quantity);
    return await cartApi.getCartItems();
  },
};
