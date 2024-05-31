import { http, HttpResponse } from "msw";

import { renderHook, waitFor } from "@testing-library/react";
import { CART_ITEMS_ENDPOINT } from "../apis/config";
import defaultData from "../mocks/handlers/cartItemList/defaultData.json";
import additionalProduct from "../mocks/handlers/cartItemList/additionalProductData.json";
import { server } from "../mocks/server";
import useCartItemList from "./useCartItemList";
import { act } from "react";

describe("useCartItemList", () => {
  describe("장바구니 아이템 목록 조회", () => {
    it("장바구니 아이템 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.cartItemList).toEqual(defaultData);
      });
    });

    it("장바구니 아이템 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() => useCartItemList());

      expect(result.current.cartItemListLoading).toBe(true);
    });
    1;

    it("장바구니 아이템 목록 조회 중 에러 상태", async () => {
      server.use(
        http.get(CART_ITEMS_ENDPOINT, () => {
          return new HttpResponse(null, { status: 500 });
        })
      );

      const { result } = renderHook(() => useCartItemList());

      await waitFor(() => {
        expect(result.current.cartItemList).toEqual([]);
        expect(result.current.cartItemListLoading).toBe(false);
        expect(result.current.cartItemListError).toBeTruthy();
      });
    });
  });

  describe("장바구니 갯수 반환", () => {
    it("장바구니에 담겨있는 item 갯수 반환", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.cartItemList.length).toEqual(defaultData.length);
      });
    });
  });

  describe("장바구니 포함 여부 반환", () => {
    it("장바구니에 담겨있는 item이면 isInCart true 반환", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.isInCart(2)).toEqual(true);
      });
    });

    it("장바구니에 담겨있지 않은 item이면 isInCart false 반환", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.isInCart(9999999)).toEqual(false);
      });
    });
  });

  describe("장바구니 추가 및 제거", () => {
    it("장바구니에 담겨있는 item이면 toggleCartItem시 아이템 제거", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.isInCart(defaultData[0].product.id)).toBe(true);
      });

      await act(async () => {
        await result.current.toggleCartItem(defaultData[0].product);
      });

      waitFor(() => {
        expect(result.current.cartItemList).toStrictEqual(
          defaultData.slice(1, defaultData.length)
        );
      });
    });

    it("장바구니에 담겨있지 않은 item이면 toggleCartItem 시 아이템 추가", async () => {
      const { result } = renderHook(() => useCartItemList());

      await act(async () => {
        await result.current.toggleCartItem(additionalProduct);
      });

      waitFor(() => {
        expect(result.current.cartItemList).toStrictEqual([
          ...defaultData,
          { id: 3098, product: additionalProduct, quantity: 1 },
        ]);
      });
    });
  });
});
