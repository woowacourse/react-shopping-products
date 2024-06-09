import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAddCartItem from "./index";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddCartItem", () => {
  it("선택한 상품을 장바구니에 담을 수 있다.", async () => {
    const { result } = renderHook(() => useAddCartItem(), { wrapper });

    act(() => {
      result.current.mutate({
        productId: 123,
        quantity: 1,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.error).toBeFalsy();
  });
});
