import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCartItemsQuery from "./useCartItemsQuery";
import mockCartItems from "../mocks/cartItems.json";

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCartItemsQuery", () => {
  it("장바구니 상품 데이터를 가져온다.", async () => {
    const { result } = renderHook(() => useCartItemsQuery(), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.cartItems).toHaveLength(
        mockCartItems.content.length
      );
    });
  });
});
