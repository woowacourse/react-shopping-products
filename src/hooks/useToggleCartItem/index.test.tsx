import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect } from "vitest";
import { PropsWithChildren, act } from "react";
import useToggleCartItem from ".";
import { server } from "../../mocks/server";
import { HttpResponse, http } from "msw";
import { CART_ITEMS_ENDPOINT } from "../../api/endPoint";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useToggleCartItem with useMutation", () => {
  it("addToCart 함수가 실행되면, 해당 아이템의 장바구니에 담긴다.", async () => {
    const { result } = renderHook(() => useToggleCartItem(), {
      wrapper: createWrapper(),
    });

    const MOCK_ITEM_ID = 105;

    act(() => {
      result.current.addToCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.cartItems.find((cartItem) => cartItem.product.id === MOCK_ITEM_ID)).toBeDefined();
    });
  });

  it("removeFromCart 함수가 실행되면, 해당 아이템의 장바구니에 담긴다.", async () => {
    const { result } = renderHook(() => useToggleCartItem(), {
      wrapper: createWrapper(),
    });

    const MOCK_ITEM_ID = 101;

    act(() => {
      result.current.removeFromCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.cartItems).not.toContain(MOCK_ITEM_ID);
    });
  });

  it("500에러 응답 시, 에러를 반환한다..", async () => {
    server.use(
      http.get(CART_ITEMS_ENDPOINT, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useToggleCartItem(), {
      wrapper: createWrapper(),
    });

    const MOCK_ITEM_ID = 101;

    act(() => {
      result.current.addToCart(MOCK_ITEM_ID);
    });

    await waitFor(() => {
      expect(result.current.queryError).toBeTruthy();
    });
  });
});
