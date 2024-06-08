import { useCartItemsQuery, useUpdateCartItemQuantityMutation } from "@/hooks/server/useCartItems";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react";

const queryClient = new QueryClient();

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
describe("useMutation", () => {
  it("장바구니에 들어있는 상품의 개수가 잘 업데이트 된다.", async () => {
    const CART_ITEM_ID = 4705;
    const NEW_QUANTITY = 3;
    const { result } = renderHook(
      () => {
        const updateMutation = useUpdateCartItemQuantityMutation();
        const cartItemsQuery = useCartItemsQuery();
        return { updateMutation, cartItemsQuery };
      },
      { wrapper }
    );
    act(() => {
      result.current.updateMutation.mutate({ cartId: CART_ITEM_ID, quantity: NEW_QUANTITY });
    });

    await waitFor(() => {
      const target = result.current.cartItemsQuery.data?.find((item) => item.id === CART_ITEM_ID);
      expect(target?.quantity).toBe(NEW_QUANTITY);
    });
  });
});
