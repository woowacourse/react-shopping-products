import { mockCartData, mockData } from '../mockData';

export function resolveCartItems() {
  return mockCartData.map((item) => {
    const product = mockData.find((p) => p.id === item.productId) || [];

    return {
      id: item.id,
      quantity: item.quantity,
      product,
    };
  });
}
