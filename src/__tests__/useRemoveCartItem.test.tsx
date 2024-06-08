import { act } from "react";

import { HttpResponse, http } from "msw";
import { server } from "../mocks/server";

import { vi } from "vitest";

import { waitFor } from "@testing-library/react";

import useFetchCartItem from "../hooks/cart-items/useFetchCartItem";
import useRemoveCartItem from "../hooks/cart-items/useRemoveCartItem";
import useToasts from "../hooks/useToasts";

import renderTestHook from "./utils/renderTestHook";

import { CART_ITEMS } from "../mocks/data/cart/cart-items";

import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";

vi.mock("/src/hooks/useToasts.ts", () => {
  const toastsMock = {
    addToast: vi.fn(),
    removeToast: vi.fn(),
  };

  return {
    default: () => toastsMock,
  };
});

describe("useRemoveCartItem", () => {
  describe("상품 삭제", () => {
    it.only("장바구니에 담긴 상품을 삭제할 수 있다", async () => {
      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const useRemoveCartItemResult = useRemoveCartItem();

        return { ...useFetchCartItemResult, ...useRemoveCartItemResult };
      });

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;
      const TARGET_CART_ITEM_ID = CART_ITEMS.content[0].id;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
      });

      act(() => {
        result.current.handleRemoveCartItem(TARGET_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH - 1);
      });
    });

    it(`상품을 삭제하는 도중 예외가 발생하면 "${PRODUCTS_ERROR_MESSAGES.removeCartItem}"예외 피드백을 토스트 메시지로 사용자에게 전달할 수 있다.`, async () => {
      server.use(
        http.delete(`${ENDPOINT.CART_ITEMS}/:cartItemId`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const useRemoveCartItemResult = useRemoveCartItem();

        return { ...useFetchCartItemResult, ...useRemoveCartItemResult };
      });

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;
      const TARGET_CART_ITEM_ID = CART_ITEMS.content[0].id;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
      });

      act(() => {
        result.current.handleRemoveCartItem(TARGET_CART_ITEM_ID);
      });

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.removeCartItem);
      });
    });
  });
});
