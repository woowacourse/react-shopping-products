import { CartItemAction, CartItemList } from '../types/type';

export const cartItemListReducer = (
  state: CartItemList,
  action: CartItemAction,
) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload];
    case 'DELETE':
      return state.filter(
        (item) => item.product.id !== action.payload.productId,
      );
    case 'PATCH':
      return state.map((item) =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    default:
      return state;
  }
};
