import { ReactNode, act } from "react";
import { vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { useUpdateCartItemMutation } from "@src/server/mutations/useUpdateCartItemMutation";
import { renderHook, waitFor } from "@testing-library/react";
import { QUERY_KEYS } from "@server/__constants__/queryKeys";
import { queryClient } from "@server/queryClient";
import { server } from "@src/mocks/server";
import { HttpResponse, http } from "msw";
import { CART_API_URL } from "@src/env/envVariables";
import { API_URL } from "@src/apis/__constants__/apiUrl";

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useUpdateCartItemMutation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("cartItem 수정 성공 시 CartItems 쿼리 무효화를 수행한다.", async () => {
    const invalidateQueriesSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderHook(() => useUpdateCartItemMutation(), {
      wrapper,
    });

    const params = { cartItemId: 101, quantity: 1 };

    await act(async () => {
      result.current.mutate(params);
    });

    await waitFor(() => {
      expect(invalidateQueriesSpy).toHaveBeenCalledWith({ queryKey: [QUERY_KEYS.cartItems] });
    });
  });

  it("cartItem 수정 실패 시 에러 핸들링을 수행한다.", async () => {
    server.use(
      http.patch(`${CART_API_URL}${API_URL.cartItems}/:cartItemId`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const onError = vi.fn();

    const { result } = renderHook(() => useUpdateCartItemMutation(onError), {
      wrapper,
    });

    const params = { cartItemId: 101, quantity: 1 };

    await act(async () => {
      result.current.mutate(params);
    });

    await waitFor(() => {
      expect(onError).toHaveBeenCalled();
    });
  });
});
