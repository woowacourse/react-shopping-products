import { renderHook } from "@testing-library/react";
import { vi } from "vitest";
import { useCartItemQuantityControl } from "@serverState/hooks/useCartItemQuantityControl";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../queryClient";
import { ReactNode, act } from "react";
import { useCartItems } from "@serverState/queries/useCartItems";

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

vi.mock("@serverState/queries/useCartItems");

describe("useCartItemQuantityControl", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUseCartItems = useCartItems as jest.Mock;

  const mockCartItems = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    product: { id: index },
  }));

  mockUseCartItems.mockReturnValue({ data: mockCartItems });

  it("20개를 초과하여 상품을 담을 경우 에러를 표시한다", async () => {
    const onError = vi.fn();

    const EXCEEDING_ITEM_ID = 20;

    const { result } = renderHook(
      () => useCartItemQuantityControl({ productId: EXCEEDING_ITEM_ID, onError }),
      {
        wrapper,
      }
    );

    await act(async () => {
      result.current.increaseQuantity();
    });

    expect(onError).toHaveBeenCalled();
  });

  it("장바구니에 담기지 않은 상품에 대해 수량을 감소시키는 경우 에러를 표시한다", async () => {
    const onError = vi.fn();

    const NON_EXISTING_ITEM_ID = 20;

    const { result } = renderHook(
      () => useCartItemQuantityControl({ productId: NON_EXISTING_ITEM_ID, onError }),
      {
        wrapper,
      }
    );

    await act(async () => {
      result.current.decreaseQuantity();
    });

    expect(onError).toHaveBeenCalled();
  });
});
