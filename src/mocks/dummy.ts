import { CartItemType, ProductItemType } from '../types/data';

export const MOCK_PRODUCTS: ProductItemType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: index % 3 === 0 ? `/images/product-${index + 1}.jpg` : '/example.png',
  quantity: index % 6 === 0 ? 0 : 5,
}));

export const MOCK_CART_ITEMS: CartItemType[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  quantity: 3,
  product: MOCK_PRODUCTS[index],
}));
