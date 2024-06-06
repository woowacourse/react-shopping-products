// 1. 20개를 초과하여 담으면 에러
// 2. 없는 상품을 삭제하려고 하면 에러

import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCartActions } from "../useCartActions";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ReactNode, act } from "react";
import { useCartItems } from "../useCartItems";

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock("@server/useCartItems");

describe("useCartActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUseCartItems = useCartItems as jest.Mock;

  const mockCartItems = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    product: { id: index },
  }));

  mockUseCartItems.mockReturnValue({ data: mockCartItems });

  it("20개를 초과하여 상품 담기를 시도하는 경우 에러를 표시한다", async () => {
    const onError = vi.fn();

    const { result } = renderHook(() => useCartActions(onError), {
      wrapper,
    });

    const EXCEEDING_ITEM_ID = 20;

    await act(async () => {
      result.current.addToCart(EXCEEDING_ITEM_ID);
    });

    expect(onError).toHaveBeenCalled();
  });

  it("장바구니에 담기지 않은 상품에 대해 삭제를 시도하는 경우 에러를 표시한다", async () => {
    const onError = vi.fn();

    const { result } = renderHook(() => useCartActions(onError), {
      wrapper,
    });

    const NON_EXISTING_ITEM_ID = 20;

    await act(async () => {
      result.current.removeFromCart(NON_EXISTING_ITEM_ID);
    });

    expect(onError).toHaveBeenCalled();
  });
});
