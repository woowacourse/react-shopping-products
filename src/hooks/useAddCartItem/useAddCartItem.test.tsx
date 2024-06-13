import { renderHook, act, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useAddCartItem from "./index";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useAddCartItem", () => {
  it("선택한 상품을 장바구니에 담는 요청에서 상품의 id와 quantity를 명시한대로 보낼 수 있다.", async () => {
    const productIdToAdd = 123;
    const quantityToAdd = 1;
    const { result } = renderHook(() => useAddCartItem(), { wrapper });

    act(() => {
      result.current.mutate({
        productId: productIdToAdd,
        quantity: quantityToAdd,
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.error).toBeFalsy();
    expect(result.current.variables).toEqual({
      productId: productIdToAdd,
      quantity: quantityToAdd,
    });
  });
});
