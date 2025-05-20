import { describe, test, expect, vi, beforeEach } from "vitest";
import * as cartApi from "../api/cartItems";
import mockCartItemsResponse from "./mockCartItems.json";

const mockCartItems = mockCartItemsResponse.content;

vi.mock("../api/cartItems");

describe("장바구니 API - Mock 데이터 기반 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("getCartItems 호출 시 10개의 mock 데이터를 배열로 반환한다", async () => {
    vi.mocked(cartApi.getCartItems).mockResolvedValue(mockCartItems);

    const items = await cartApi.getCartItems();

    expect(Array.isArray(items)).toBe(true);
    expect(items.length).toBe(10);
    expect(items[0].product.id).toBe(1);
  });

  test("장바구니에 상품을 추가할 수 있다", async () => {
    const spy = vi.spyOn(cartApi, "postCartItems").mockResolvedValue(undefined);

    await cartApi.postCartItems(1);

    expect(spy).toHaveBeenCalledWith(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test("장바구니에서 상품을 삭제할 수 있다", async () => {
    const spy = vi
      .spyOn(cartApi, "deleteCartItem")
      .mockResolvedValue(undefined);

    await cartApi.deleteCartItem(1004);

    expect(spy).toHaveBeenCalledWith(1004);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
