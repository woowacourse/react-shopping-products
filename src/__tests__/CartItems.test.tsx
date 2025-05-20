import { describe, test, expect, beforeAll, afterAll, afterEach } from 'vitest';
import * as cartApi from '../api/cartItems';
import { server } from '../mocks/node';

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

    // 성공적으로 추가되었는지 확인
    expect(result).toBeUndefined();
  });

  test('장바구니에서 상품을 삭제할 수 있다', async () => {
    const result = await cartApi.deleteCartItem(1004);

    expect(result == null).toBe(true);
  });
});
