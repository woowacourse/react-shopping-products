import { waitFor } from "@testing-library/react";

import useFetchCartItem from "../hooks/cart-items/useFetchCartItem";

import renderTestHook from "./utils/renderTestHook";

import { CART_ITEMS } from "../mocks/data/cart/cart-items";
import { testQueryClient } from "./utils/testQueryClient";

describe("useFetchCartItem", () => {
  describe("초기 장바구니 상품 목록", () => {
    beforeEach(() => {
      testQueryClient.clear();
    });

    it("장바구니에 담긴 상품 목록을 조회할 수 있다.", async () => {
      const { result } = renderTestHook(useFetchCartItem);

      const EXPECTED_CART_ITEM_LENGTH = CART_ITEMS.content.length;

      const CART_ITEM = CART_ITEMS.content[0];
      const CART_ITEM_PRODUCT_ID = CART_ITEM.product.id;

      await waitFor(() => {
        expect(result.current.cartItemLength).toBe(EXPECTED_CART_ITEM_LENGTH);
        expect(result.current.checkIsInCart(CART_ITEM_PRODUCT_ID)).toBe(true);
        expect(result.current.getCartItem(CART_ITEM_PRODUCT_ID)).toEqual(CART_ITEM);
      });
    });
  });
});
