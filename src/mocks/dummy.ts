import { CartItemType, ProductItemType } from '../types/data';

export interface MockProductsType extends ProductItemType {
  quantity: number;
}

export interface MockCartItemType extends CartItemType {
  product: MockProductsType;
}

export const MOCK_PRODUCTS: MockProductsType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
  quantity: 5,
}));

export const MOCK_CART_ITEMS: MockCartItemType[] = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  quantity: 3,
  product: MOCK_PRODUCTS[index],
}));
