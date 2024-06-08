import { act } from "react";
import { vi } from "vitest";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";
import { waitFor } from "@testing-library/react";

import useAddCartItem from "../hooks/cart-items/useAddCartItem";
import useFetchCartItem from "../hooks/cart-items/useFetchCartItem";
import useToasts from "../hooks/useToasts";

import renderTestHook from "./utils/renderTestHook";
import { testQueryClient } from "./utils/testQueryClient";

import {
  CART_ITEMS,
  NEW_BOOKS_CART_ITEM,
  NEW_SHOES_CART_ITEM,
} from "../mocks/data/cart/cart-items";
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

describe("useAddCartItem", () => {
  describe("상품 추가", () => {
    beforeEach(() => {
      testQueryClient.clear();
    });

    it("장바구니에 새로운 상품을 추가할 수 있다.", async () => {
      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const useAddCartItemResult = useAddCartItem();

        return { ...useFetchCartItemResult, ...useAddCartItemResult };
      });

      const INITIAL_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(INITIAL_CART_ITEM_LENGTH);
      });

      const TARGET_PRODUCT_ID = NEW_SHOES_CART_ITEM.product.id;

      act(() => {
        result.current.handleAddCartItem(TARGET_PRODUCT_ID);
      });

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(INITIAL_CART_ITEM_LENGTH + 1);
        expect(result.current.checkIsInCart(TARGET_PRODUCT_ID)).toBe(true);
        expect(result.current.getCartItem(TARGET_PRODUCT_ID)).toEqual(NEW_SHOES_CART_ITEM);
      });
    });

    it("상품을 추가하는 과정에서 예외가 발생하면 예외 피드백을 토스트 메시지로 사용자에게 전달할 수 있다.", async () => {
      server.use(
        http.post(ENDPOINT.CART_ITEMS, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const useAddCartItemResult = useAddCartItem();

        return { ...useFetchCartItemResult, ...useAddCartItemResult };
      });

      const INITIAL_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(INITIAL_CART_ITEM_LENGTH);
      });

      const TARGET_PRODUCT_ID = NEW_BOOKS_CART_ITEM.product.id; // 도서 상품 추가

      act(() => {
        result.current.handleAddCartItem(TARGET_PRODUCT_ID);
      });

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(INITIAL_CART_ITEM_LENGTH);
        expect(result.current.checkIsInCart(TARGET_PRODUCT_ID)).toBe(false);
        expect(result.current.getCartItem(TARGET_PRODUCT_ID)).toBe(undefined);

        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.addingCartItem);
      });
    });
  });
});
