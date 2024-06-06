import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useCartItemQuantity from "./useCartItemQuantity";
import { PropsWithChildren } from "react";

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
      },
    },
  });
  return ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useCartItemQuantity", () => {
  it("increaseQuantity 실행시 수량이 1 증가한다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const PRODUCT_ID = 101;
    const EXPECTED_QUANTITY = 3;

    act(() => {
      result.current.increaseQuantity(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.product.id === 101).quantity).toBe(EXPECTED_QUANTITY);
    });
  });

  it("decreaseQuantity 실행시 수량이 1 감소한다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const PRODUCT_ID = 101;
    const EXPECTED_QUANTITY = 1;

    act(() => {
      result.current.decreaseQuantity(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.product.id === 101).quantity).toBe(EXPECTED_QUANTITY);
    });
  });

  it("수량이 1개일 때 decreaseQuantity 실행시, Cart에서 삭제된다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const PRODUCT_ID = 104;

    act(() => {
      result.current.decreaseQuantity(PRODUCT_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.product.id === 102)).toBeUndefined();
    });
  });
});
