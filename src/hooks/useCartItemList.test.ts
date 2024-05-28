import { http, HttpResponse } from "msw";

import { renderHook, waitFor } from "@testing-library/react";

import { CART_ITEMS_ENDPOINT } from "../api/config";
import { server } from "../mocks/server";
import useCartItemList from "./useCartItemList";

describe("useCartItemList", () => {
  describe("장바구니 아이템 목록 조회", () => {
    it("장바구니 아이템 목록을 조회한다.", async () => {
      const { result } = renderHook(() => useCartItemList());
      await waitFor(() => {
        expect(result.current.cartItemList).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: 3091,
              quantity: 1,
              product: expect.objectContaining({
                id: 2,
                name: "나이키",
                price: 1000,
                imageUrl:
                  "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/a28864e3-de02-48bb-b861-9c592bc9a68b/%EB%B6%81-1-ep-%EB%86%8D%EA%B5%AC%ED%99%94-UOp6QQvg.png",
                category: "fashion",
              }),
            }),
          ])
        );
      });
    });

    it("장바구니 아이템 목록 조회 중 로딩 상태", () => {
      const { result } = renderHook(() => useCartItemList());

      expect(result.current.loading).toBe(true);
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
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeTruthy();
      });
    });
  });

  describe("장바구니 아이템 추가", () => {
    it("선택한 id의 장바구니 아이템 추가 요청", () => {
      server.use(
        http.post(CART_ITEMS_ENDPOINT, () => {
          return new HttpResponse(n);
        })
      );
    });
  });

  describe("장바구니 아이템 삭제", async () => {
    it("선택한 id의 장바누기 아이템 삭제 요청", () => {
      const { result } = renderHook(() => useCartItemList());
    });
  });
});
