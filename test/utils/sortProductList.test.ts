import { describe, expect, it } from 'vitest';
import { Product } from '../../src/types';
import sortProductList from '../../src/utils/sortProductList';

describe('sortProductList 유틸 함수 테스트', () => {
  it('상품 목록과 낮은 가격순 정렬 기준이 주어지면 낮은 가격순으로 정렬된 상품 목록을 반환한다.', () => {
    const products: Product[] = [
      { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품' },
      { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품' },
      { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품' },
    ];
    expect(sortProductList(products, 'asc')).toEqual([
      { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품' },
      { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품' },
      { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품' },
    ]);
  });

  it('상품 목록과 높은 가격순 정렬 기준이 주어지면 높은 가격순으로 정렬된 상품 목록을 반환한다.', () => {
    const products: Product[] = [
      { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품' },
      { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품' },
      { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품' },
    ];
    expect(sortProductList(products, 'desc')).toEqual([
      { id: 1, name: '첫째', price: 7000, imageUrl: '', category: '식료품' },
      { id: 3, name: '셋째', price: 5000, imageUrl: '', category: '식료품' },
      { id: 2, name: '둘째', price: 3000, imageUrl: '', category: '식료품' },
    ]);
  });
});
