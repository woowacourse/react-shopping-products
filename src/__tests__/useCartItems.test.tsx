import { ReactNode } from "react";
import { renderHook, waitFor, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCartItems } from "../hooks";
import { initialCartItems } from "../mocks/cartItems/initialCartItems";

const wrapper = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>;
};

describe("useCartItems", () => {
  const INITIAL_CART_ITEMS_LENGTH = initialCartItems.content.length;

  describe("장바구니 초기 상태", () => {
    it(`장바구니에 담긴 아이템 초기 수량은 ${INITIAL_CART_ITEMS_LENGTH}이다.`, async () => {
      const { result } = renderHook(() => useCartItems(), { wrapper });

      await waitFor(() => {
        expect(result.current.cartItems.length).toBe(INITIAL_CART_ITEMS_LENGTH);
      });
    });
  });

  describe("상품의 장바구니 추가 및 제거", () => {
    it('상품 하단의 "담기" 버튼을 누르면 장바구니에 추가되어야 한다.', async () => {
      const ADD_CART_ITEM_ID = 2;

      const { result } = renderHook(() => useCartItems(), { wrapper });

      act(() => {
        result.current.handleAddCartItem(ADD_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.cartItems.length).toBe(INITIAL_CART_ITEMS_LENGTH + 1);
      });
    });

    it.skip(`상품 하단의 "빼기" 버튼을 누르면 해당 상품이 장바구니에서 제거되어야 하고, 남은 장바구니 상품 종류 수는 ${INITIAL_CART_ITEMS_LENGTH - 1}이어야 한다.`, async () => {
      const DELETE_CART_ITEM_ID = 2;

      const { result } = renderHook(() => useCartItems(), { wrapper });

      act(() => {
        result.current.handleRemoveCartItem(DELETE_CART_ITEM_ID);
      });

      await waitFor(() => {
        console.log(result.current.cartItems);
        expect(result.current.cartItems.length).toBe(INITIAL_CART_ITEMS_LENGTH - 1);
      });
    });
  });
});
