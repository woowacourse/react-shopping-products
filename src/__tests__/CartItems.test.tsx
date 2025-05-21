import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import * as cartApi from '../api/cartItems';
import { server } from '../mocks/node';
import { http, HttpResponse } from 'msw';
import { END_POINT } from '../api/constants/endPoint';

// MSW 서버 설정
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('장바구니 API - MSW 기반 테스트', () => {
  test('장바구니 데이터를 잘 불러온다', async () => {
    const items = await cartApi.getCartItems();

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(10);
    expect(items[0].product.id).toBe(1);
  });

  test('장바구니에 상품을 추가할 수 있다', async () => {
    const result = await cartApi.postCartItems(1);

    expect(result == null).toBe(true);
  });

  test('장바구니에서 상품을 삭제할 수 있다', async () => {
    const result = await cartApi.deleteCartItem(1004);

    expect(result == null).toBe(true);
  });

  // Bad Path 테스트 추가
  describe('예외 상황 테스트', () => {
    test('존재하지 않는 상품을 장바구니에 추가하면 오류가 발생한다', async () => {
      // 임시 핸들러 설정 - 404 에러 반환
      server.use(
        http.post(END_POINT.CART, async () => {
          return new HttpResponse(JSON.stringify({ message: '상품을 찾을 수 없습니다.' }), {
            status: 404,
          });
        }),
      );

      // 존재하지 않는 상품 ID로 요청
      await expect(cartApi.postCartItems(9999)).rejects.toThrow();
    });

    test('장바구니 최대 용량(10개) 초과 시 오류가 발생한다', async () => {
      // 임시 핸들러 설정 - 400 에러 반환
      server.use(
        http.post(END_POINT.CART, async () => {
          return new HttpResponse(
            JSON.stringify({ message: '장바구니 최대 용량을 초과했습니다.' }),
            { status: 400 },
          );
        }),
      );

      await expect(cartApi.postCartItems(1)).rejects.toThrow();
    });

    test('존재하지 않는 장바구니 항목을 삭제하면 오류가 발생한다', async () => {
      // 임시 핸들러 설정 - 404 에러 반환
      server.use(
        http.delete(new RegExp(`${END_POINT.CART}/\\d+`), () => {
          return new HttpResponse(
            JSON.stringify({ message: '장바구니 항목을 찾을 수 없습니다.' }),
            { status: 404 },
          );
        }),
      );

      // 존재하지 않는 장바구니 ID로 요청
      await expect(cartApi.deleteCartItem(9999)).rejects.toThrow();
    });

    test('네트워크 오류가 발생하면 장바구니 조회에 실패한다', async () => {
      // 임시 핸들러 설정 - 네트워크 오류 시뮬레이션
      server.use(
        http.get(END_POINT.CART, () => {
          return HttpResponse.error();
        }),
      );

      await expect(cartApi.getCartItems()).rejects.toThrow();
    });
  });
});
