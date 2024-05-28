// tests/useToggleCartItem.test.js
import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useToggleCartItem from "../hooks/useToggleCartItem";
import { waitFor } from "@testing-library/react";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";
import { CART_ITEMS_ENDPOINT } from "../api/endPoint";

describe("useToggleCartItem", () => {
  const MOCK_ITEM_ID = 100;

  it("사용자가 담기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 +1된다", async () => {
    const { result } = renderHook(() => useToggleCartItem());
    const count = result.current.cartItems.length;

    act(async () => {
      await result.current.addToCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(count + 1);
    });
  });

  it("사용자가 빼기 버튼을 누르면, 장바구니에 담긴 아이템 종류의 갯수가 -1된다", async () => {
    const { result } = renderHook(() => useToggleCartItem());
    const count = result.current.cartItems.length;

    act(async () => {
      await result.current.removeFromCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(count - 1);
    });
  });

  it("담기 요청 중 에러가 발생하면, error값이 반환된다", async () => {
    server.use(
      http.get(CART_ITEMS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useToggleCartItem());

    act(async () => {
      await result.current.addToCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
  it("장바구니에 아이템을 추가할 때 로딩 상태를 표시한다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    act(async () => {
      await result.current.addToCart(MOCK_ITEM_ID);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("장바구니에 아이템을 삭제할 때 로딩 상태를 표시한다", async () => {
    const { result } = renderHook(() => useToggleCartItem());

    act(async () => {
      await result.current.removeFromCart(MOCK_ITEM_ID);
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });
});
