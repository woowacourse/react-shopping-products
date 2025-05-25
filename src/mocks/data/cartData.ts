import { cartDataType } from '../../types/cartItem';
import { mockProducts } from './productsData';

export let mockCartItems: cartDataType[] = [
  {
    id: 1,
    quantity: 2,
    product: mockProducts[0],
  },
  {
    id: 2,
    quantity: 1,
    product: mockProducts[2],
  },
];

export let cartIdCounter = 3;

export const cartDataStore = {
  getAll: () => mockCartItems,

  findById: (id: number) => mockCartItems.find((item) => item.id === id),

  findByProductId: (productId: number) =>
    mockCartItems.find((item) => item.product.id === productId),

  add: (productId: number, quantity: number) => {
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return null;

    const newCartItem: cartDataType = {
      id: cartIdCounter++,
      quantity,
      product,
    };

    mockCartItems.push(newCartItem);
    return newCartItem;
  },

  remove: (cartId: number) => {
    const index = mockCartItems.findIndex((item) => item.id === cartId);
    if (index === -1) return false;

    mockCartItems.splice(index, 1);
    return true;
  },

  updateQuantity: (cartId: number, quantity: number) => {
    const item = mockCartItems.find((item) => item.id === cartId);
    if (!item) return null;

    item.quantity = quantity;
    return item;
  },

  reset: () => {
    mockCartItems = [
      {
        id: 1,
        quantity: 2,
        product: mockProducts[0],
      },
      {
        id: 2,
        quantity: 1,
        product: mockProducts[2],
      },
    ];
    cartIdCounter = 3;
  },
};
