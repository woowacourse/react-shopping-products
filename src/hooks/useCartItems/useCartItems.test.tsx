import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useCartItems from "./index";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useCartItems", () => {
  it("장바구니에 존재하는 상품을 불러올 수 있다.", async () => {
    const cartItems = "cartItems";
    const errorMessage = "errorMessage";
    const isLoading = "isLoading";
    const { result } = renderHook(() => useCartItems(), { wrapper });

    await waitFor(() => expect(result.current.isLoading).toEqual(false));

    expect(result.current).toHaveProperty(cartItems);
    expect(result.current).toHaveProperty(isLoading);
    expect(result.current).toHaveProperty(errorMessage);
  });
});
