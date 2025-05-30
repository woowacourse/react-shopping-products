import { describe, it, expect } from 'vitest';
import { CartProduct, Product } from '../../src/types';
import getMergedData from '../../src/utils/getMergedData';

describe('getMergedData', () => {
  const products: Product[] = [
    { id: 1, name: '상품 1', price: 10000, imageUrl: '', category: '식료품', quantity: 1 },
    { id: 2, name: '상품 2', price: 20000, imageUrl: '', category: '패션잡화', quantity: 1 },
    { id: 3, name: '상품 3', price: 30000, imageUrl: '', category: '식료품', quantity: 1 },
  ];
  it('상품 목록과 장바구니 목록을 병합해 새로운 데이터를 만들어 낸다. 이 때, 장바구니에 없는 경우 -1이 추가된다.', () => {
    const cartProducts: CartProduct[] = [
      {
        id: 101,
        product: {
          id: 1,
          name: '상품 1',
          price: 10000,
          imageUrl: '',
          category: '식료품',
          quantity: 1,
        },
        quantity: 2,
      },
      {
        id: 103,
        product: {
          id: 3,
          name: '상품 3',
          price: 30000,
          imageUrl: '',
          category: '식료품',
          quantity: 1,
        },
        quantity: 1,
      },
    ];

    const result = getMergedData(products, cartProducts);

    expect(result).toEqual([
      {
        id: 1,
        name: '상품 1',
        price: 10000,
        imageUrl: '',
        category: '식료품',
        cartInfo: { id: 101, quantity: 2 },
        quantity: 1,
      },
      {
        id: 2,
        name: '상품 2',
        price: 20000,
        imageUrl: '',
        category: '패션잡화',
        cartInfo: { id: -1, quantity: 0 },
        quantity: 1,
      },
      {
        id: 3,
        name: '상품 3',
        price: 30000,
        imageUrl: '',
        category: '식료품',
        cartInfo: { id: 103, quantity: 1 },
        quantity: 1,
      },
    ]);
  });
});
