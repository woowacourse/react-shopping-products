import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { getProducts } from '../api/products';
import { server } from '../mocks/node';

// MSW 서버 설정
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('상품 API - MSW 기반 테스트', () => {
  test('최대 20개의 상품 데이터를 가져온다', async () => {
    const data = await getProducts({ page: 0, size: 20 });

    expect(data.content.length).toBeLessThanOrEqual(20);
    expect(data).toHaveProperty('totalPages');
    expect(Array.isArray(data.content)).toBe(true);
    expect(data.content[0]).toHaveProperty('id');
    expect(data.content[0]).toHaveProperty('name');
    expect(data.content[0]).toHaveProperty('price');
  });

  describe('상품 API 카테고리 필터 테스트', () => {
    test("카테고리 '패션잡화'로 요청 시 해당 카테고리 상품만 응답된다", async () => {
      const result = await getProducts({
        page: 0,
        size: 20,
        category: '패션잡화',
      });

      expect(result.content.length).toBeGreaterThan(0);

      const allAreFashion = result.content.every((product) => product.category === '패션잡화');

      expect(allAreFashion).toBe(true);
    });

    test("카테고리 '식료품'으로 요청 시 해당 카테고리 상품만 응답된다", async () => {
      const result = await getProducts({
        page: 0,
        size: 20,
        category: '식료품',
      });

      expect(result.content.length).toBeGreaterThan(0);

      const allAreFood = result.content.every((product) => product.category === '식료품');

      expect(allAreFood).toBe(true);
    });
  });

  describe('상품 API 정렬 테스트', () => {
    test('낮은 가격순으로 정렬된 상품 목록을 반환한다', async () => {
      const result = await getProducts({
        page: 0,
        size: 20,
        sort: 'price,asc',
      });

      expect(result.content.length).toBeGreaterThan(1);

      const prices = result.content.map((p) => p.price);
      const isSortedAsc = prices.every((val, i, arr) => i === 0 || arr[i - 1] <= val);

      expect(isSortedAsc).toBe(true);
    });

    test('높은 가격순으로 정렬된 상품 목록을 반환한다', async () => {
      const result = await getProducts({
        page: 0,
        size: 20,
        sort: 'price,desc',
      });

      expect(result.content.length).toBeGreaterThan(1);

      const prices = result.content.map((p) => p.price);
      const isSortedDesc = prices.every((val, i, arr) => i === 0 || arr[i - 1] >= val);

      expect(isSortedDesc).toBe(true);
    });
  });
});
