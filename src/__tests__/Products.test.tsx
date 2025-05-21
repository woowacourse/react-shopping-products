import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import { getProducts } from '../api/products';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { END_POINT } from '../api/constants/endPoint';

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

  // Bad Path 테스트 추가
  describe('상품 API 예외 상황 테스트', () => {
    test('존재하지 않는 카테고리로 요청하면 빈 목록을 반환한다', async () => {
      // 임시 핸들러 설정 - 빈 목록 반환
      server.use(
        http.get(END_POINT.PRODUCT, ({ request }) => {
          const url = new URL(request.url);
          const category = url.searchParams.get('category');

          if (category === '존재하지않는카테고리') {
            return HttpResponse.json({
              content: [],
              page: 0,
              size: 20,
              totalElements: 0,
              totalPages: 0,
            });
          }

          // 다른 요청은 기본 핸들러가 처리
          return HttpResponse.error();
        }),
      );

      const result = await getProducts({
        page: 0,
        size: 20,
        category: '존재하지않는카테고리',
      });

      expect(result.content.length).toBe(0);
      expect(result.content).toHaveLength(0);
    });

    test('마지막 페이지를 넘어서는 페이지 요청 시 빈 목록을 반환한다', async () => {
      // 임시 핸들러 설정 - 빈 목록 반환
      server.use(
        http.get(END_POINT.PRODUCT, ({ request }) => {
          const url = new URL(request.url);
          const page = Number(url.searchParams.get('page') || '0');

          if (page > 10) {
            // 가정: 총 페이지는 10페이지
            return HttpResponse.json({
              content: [],
              page: page,
              size: 20,
              totalElements: 200,
              totalPages: 10,
            });
          }

          // 다른 요청은 기본 핸들러가 처리
          return HttpResponse.error();
        }),
      );

      const result = await getProducts({
        page: 99, // 매우 큰 페이지 번호
        size: 20,
      });

      expect(result.content.length).toBe(0);
      expect(result.totalPages).toBe(10); // 전체 페이지 수는 여전히 10
    });

    test('잘못된 정렬 옵션으로 요청하면 기본 정렬로 응답한다', async () => {
      // 임시 핸들러 설정 - 기본 정렬 사용
      server.use(
        http.get(END_POINT.PRODUCT, ({ request }) => {
          const url = new URL(request.url);
          const sort = url.searchParams.get('sort');

          if (sort === '잘못된정렬') {
            // 기본 정렬된 응답 반환
            return HttpResponse.json({
              content: [
                { id: 1, name: '기본정렬상품1', price: 1000, category: '패션잡화' },
                { id: 2, name: '기본정렬상품2', price: 2000, category: '패션잡화' },
              ],
              page: 0,
              size: 20,
              totalElements: 2,
              totalPages: 1,
            });
          }

          // 다른 요청은 기본 핸들러가 처리
          return HttpResponse.error();
        }),
      );

      const result = await getProducts({
        page: 0,
        size: 20,
        sort: '잘못된정렬',
      });

      expect(result.content.length).toBeGreaterThan(0);
      expect(result.content[0].name).toBe('기본정렬상품1');
    });

    test('네트워크 오류가 발생하면 상품 조회에 실패한다', async () => {
      // 임시 핸들러 설정 - 네트워크 오류 시뮬레이션
      server.use(
        http.get(END_POINT.PRODUCT, () => {
          return HttpResponse.error();
        }),
      );

      await expect(getProducts({ page: 0, size: 20 })).rejects.toThrow();
    });

    test('서버 내부 오류가 발생하면 500 에러로 응답한다', async () => {
      // 임시 핸들러 설정 - 서버 오류 시뮬레이션
      server.use(
        http.get(END_POINT.PRODUCT, () => {
          return new HttpResponse(JSON.stringify({ message: '서버 내부 오류가 발생했습니다.' }), {
            status: 500,
          });
        }),
      );

      await expect(getProducts({ page: 0, size: 20 })).rejects.toThrow();
    });
  });
});
