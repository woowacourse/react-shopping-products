import { act } from "react";

import { waitFor } from "@testing-library/react";

import useFetchCartItem from "../hooks/cart-items/useFetchCartItem";
import usePatchCartItemQuantity from "../hooks/cart-items/usePatchCartItemQuantity";
import useToasts from "../hooks/useToasts";

import renderTestHook from "./utils/renderTestHook";

import { CART_ITEMS } from "../mocks/data/cart/cart-items";
import { CartItem } from "../types/cartItem";
import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";
import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";
import { vi } from "vitest";

vi.mock("/src/hooks/useToasts.ts", () => {
  const toastsMock = {
    addToast: vi.fn(),
    removeToast: vi.fn(),
  };

  return {
    default: () => toastsMock,
  };
});

describe("usePatchCartItemQuantity", () => {
  describe("상품의 수량 변경", () => {
    it("상품의 수량을 1 증가시킬 수 있다.", async () => {
      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const usePatchCartItemQuantityResult = usePatchCartItemQuantity();

        return { ...useFetchCartItemResult, ...usePatchCartItemQuantityResult };
      });

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
      });

      const TARGET_CART_ITEM = CART_ITEMS.content[0];
      const TARGET_CART_ITEM_PRODUCT_ID = TARGET_CART_ITEM.product.id;
      const PREV_TARGET_CART_ITEM_QUANTITY = TARGET_CART_ITEM.quantity;

      act(() => {
        result.current.handleIncreaseQuantity(
          TARGET_CART_ITEM_PRODUCT_ID,
          PREV_TARGET_CART_ITEM_QUANTITY,
        );
      });

      await waitFor(() => {
        const targetCartItem = result.current.getCartItem(TARGET_CART_ITEM_PRODUCT_ID) as CartItem;

        expect(targetCartItem.quantity).toBe(PREV_TARGET_CART_ITEM_QUANTITY + 1);
      });
    });

    it("상품의 수량을 1 감소시킬 수 있다.", async () => {
      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const usePatchCartItemQuantityResult = usePatchCartItemQuantity();

        return { ...useFetchCartItemResult, ...usePatchCartItemQuantityResult };
      });

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
      });

      const TARGET_CART_ITEM = CART_ITEMS.content[0];
      const TARGET_CART_ITEM_PRODUCT_ID = TARGET_CART_ITEM.product.id;
      const PREV_TARGET_CART_ITEM_QUANTITY = TARGET_CART_ITEM.quantity;

      act(() => {
        result.current.handleDecreaseQuantity(
          TARGET_CART_ITEM_PRODUCT_ID,
          PREV_TARGET_CART_ITEM_QUANTITY,
        );
      });

      await waitFor(() => {
        const targetCartItem = result.current.getCartItem(TARGET_CART_ITEM_PRODUCT_ID) as CartItem;

        expect(targetCartItem.quantity).toBe(PREV_TARGET_CART_ITEM_QUANTITY - 1);
      });
    });
  });

  describe("상품 수량 변경 중 예외", () => {
    it(`상품 수량 변경 중 예외가 발생하면 "${PRODUCTS_ERROR_MESSAGES.changeQuantity}"예외 피드백을 토스트 메시지로 사용자에게 전달할 수 있다.`, async () => {
      server.use(
        http.patch(`${ENDPOINT.CART_ITEMS}/:productId`, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(() => {
        const useFetchCartItemResult = useFetchCartItem();
        const usePatchCartItemQuantityResult = usePatchCartItemQuantity();

        return { ...useFetchCartItemResult, ...usePatchCartItemQuantityResult };
      });

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
      });

      const TARGET_CART_ITEM = CART_ITEMS.content[0];
      const TARGET_CART_ITEM_PRODUCT_ID = TARGET_CART_ITEM.product.id;
      const PREV_TARGET_CART_ITEM_QUANTITY = TARGET_CART_ITEM.quantity;

      act(() => {
        result.current.handleIncreaseQuantity(
          TARGET_CART_ITEM_PRODUCT_ID,
          PREV_TARGET_CART_ITEM_QUANTITY,
        );
      });

      await waitFor(() => {
        const targetCartItem = result.current.getCartItem(TARGET_CART_ITEM_PRODUCT_ID) as CartItem;

        expect(targetCartItem.quantity).toBe(PREV_TARGET_CART_ITEM_QUANTITY);
        expect(useToasts().addToast).toHaveBeenCalledWith(PRODUCTS_ERROR_MESSAGES.changeQuantity);
      });
    });
  });
});
