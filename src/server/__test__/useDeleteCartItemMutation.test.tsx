import { ReactNode, act } from "react";
import { vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { QUERY_KEYS } from "@server/__constants__/queryKeys";
import { queryClient } from "@server/queryClient";
import { server } from "@mocks/server";
import { HttpResponse, http } from "msw";
import { CART_API_URL } from "@env/envVariables";
import { API_URL } from "@apis/__constants__/apiUrl";
import { useDeleteCartItemMutation } from "@src/server/mutations/useDeleteCartItemMutation";

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useDeleteCartItemMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("cartItem 삭제 성공 시 CartItems 쿼리 무효화를 수행한다.", async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useDeleteCartItemMutation(), {
      wrapper,
    });

    const ITEM_ID = 101;

    await act(async () => {
      result.current.mutate(ITEM_ID);
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [QUERY_KEYS.cartItems] });
    });
  });

  it("cartItem 삭제 실패 시 에러 핸들링을 수행한다.", async () => {
    server.use(
      http.delete(`${CART_API_URL}${API_URL.cartItems}/:cartItemId`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const onError = vi.fn();

    const { result } = renderHook(() => useDeleteCartItemMutation(onError), {
      wrapper,
    });

    const ITEM_ID = 101;

    await act(async () => {
      result.current.mutate(ITEM_ID);
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
