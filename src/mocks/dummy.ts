import { ProductItemType } from '../types/data';

export const MOCK_PRODUCTS: ProductItemType[] = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  category: index % 2 === 0 ? '식료품' : '패션잡화',
  price: 1000 + index * 100,
  imageUrl: `/images/product-${index + 1}.jpg`,
  quantity: 20,
}));
