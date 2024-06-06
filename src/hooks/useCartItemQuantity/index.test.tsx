import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import useCartItemQuantity from "./index";
import { PropsWithChildren } from "react";

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

describe("useCartItemQuantity", () => {
  it("increaseQuantity 실행시 수량이 1 증가한다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const CART_ID = 2;
    const EXPECTED_QUANTITY = 3;

    await waitFor(() => {
      expect(result.current.cartItems).not.toHaveLength(0);
    });

    act(() => {
      result.current.increaseQuantity(CART_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.id === CART_ID)?.quantity).toBe(EXPECTED_QUANTITY);
    });
  });

  it("decreaseQuantity 실행시 수량이 1 감소한다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const CART_ID = 2;
    const EXPECTED_QUANTITY = 1;

    await waitFor(() => {
      expect(result.current.cartItems).not.toHaveLength(0);
    });

    act(() => {
      result.current.decreaseQuantity(CART_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.id === CART_ID)?.quantity).toBe(EXPECTED_QUANTITY);
    });
  });

  it("수량이 1개일 때 decreaseQuantity 실행시, Cart에서 삭제된다", async () => {
    const { result } = renderHook(() => useCartItemQuantity(), { wrapper: createWrapper() });

    const CART_ID = 3;

    act(() => {
      result.current.decreaseQuantity(CART_ID);
    });

    await waitFor(() => {
      expect(result.current.cartItems.find((item) => item.id === CART_ID)).toBeUndefined();
    });
  });
});
