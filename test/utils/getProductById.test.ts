import { describe, expect, it } from 'vitest';
import { Product } from '../../src/types';
import getElementById from '../../src/utils/getElementById';

describe('getProductById 유틸 함수 테스트', () => {
  const products: Product[] = [
    { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품', quantity: 1 },
    { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품', quantity: 5 },
    { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품', quantity: 10 },
  ];
  it.each([
    [1, { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품', quantity: 1 }],
    [2, { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품', quantity: 5 }],
    [3, { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품', quantity: 10 }],
  ])('상품 목록과 ID(%s)를 주면 해당하는 ID를 가지고 있는 상품 배열을 반환한다.', (id, result) => {
    expect(getElementById(products, id)).toEqual([result]);
  });
});
