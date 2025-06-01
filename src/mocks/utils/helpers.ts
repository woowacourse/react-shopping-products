import { CartItem, mockCartItems } from '../datas/mockCartItem';

export const addCartItem = (item: CartItem) => {
  mockCartItems.push(item);
};

export const updateCartItem = (cartId: number, quantity: number) => {
  const index = mockCartItems.findIndex((item) => item.id === cartId);
  if (index !== -1) {
    mockCartItems[index] = { ...mockCartItems[index], quantity };
  }
};
