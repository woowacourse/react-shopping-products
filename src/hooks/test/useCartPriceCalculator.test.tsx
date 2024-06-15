import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import mockCartItems from "@/mocks/mockResponse/cart-items.json";
import initialCartItems from "@/mocks/mockResponse/cart-items.json";
import useCardPriceCalculator from "@/hooks/useCartPriceCalculator";

beforeEach(() => {
  Object.assign(mockCartItems, JSON.parse(JSON.stringify(initialCartItems)));
});

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("장바구니 관련 테스트", () => {
  it("장바구니에 있는 상품의 가격을 잘 계산한다.", async () => {
    const { result } = renderHook(() => useCardPriceCalculator(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.calculateItemsPrice(mockCartItems.content)).toBe(60000);
    });
  });
});
