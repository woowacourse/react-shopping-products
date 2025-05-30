import { describe, expect, it } from 'vitest';
import { CartProduct } from '../../src/types';
import getElementById from '../../src/utils/getElementById';

describe('getCartById 유틸 함수 테스트', () => {
  const carts: CartProduct[] = [
    {
      id: 1,
      quantity: 1,
      product: { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품', quantity: 1 },
    },
    {
      id: 2,
      quantity: 2,
      product: { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품', quantity: 5 },
    },
    {
      id: 3,
      quantity: 3,
      product: { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품', quantity: 10 },
    },
  ];
  it.each([
    [1, carts[0]],
    [2, carts[1]],
    [3, carts[2]],
  ])(
    '장바구니 목록과 ID(%s)를 주면 해당하는 ID를 가지고 있는 장바구니 배열을 반환한다.',
    (id, result) => {
      expect(getElementById(carts, id)).toEqual([result]);
    }
  );
});
