import { describe, test, expect, beforeAll, afterEach, afterAll } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handlers";
import { getCartItems, postCartItems, deleteCartItem } from "../api/cartItems";
import { resetCartItems, mockCartItems } from "../mocks/data/cartItems";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  resetCartItems();
});
afterAll(() => server.close());
beforeEach(() => {
  server.resetHandlers();
  resetCartItems();
});

describe("장바구니 API - MSW 기반 테스트", () => {
  test("getCartItems 호출 시 mockCartItems 배열을 반환한다", async () => {
    const items = await getCartItems();

    expect(items[0].product.name).toBeDefined();
    expect(items[0].product.imageUrl).toMatch(/^http/);
  });

  test("장바구니에 상품을 추가할 수 있다", async () => {
    await postCartItems(1, 1);

    const items = await getCartItems();
    const found = items.find((item) => item.productId === 1);

    expect(found).toBeDefined();
    expect(found?.quantity).toBeGreaterThan(0);
  });

  test("장바구니에서 상품을 삭제할 수 있다", async () => {
    const existingId = mockCartItems[0].id;
    await deleteCartItem(existingId);

    const items = await getCartItems();
    expect(items.find((item) => item.id === existingId)).toBeUndefined();
  });

  test("재고를 초과하면 400 에러를 반환한다", async () => {
    const OVER_LIMIT_QUANTITY = 9999;

    await expect(postCartItems(1, OVER_LIMIT_QUANTITY)).rejects.toMatchObject({
      response: {
        status: 400,
        data: {
          errorCode: "OUT_OF_STOCK",
        },
      },
    });
  });
});
