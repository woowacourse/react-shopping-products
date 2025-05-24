vi.mock("../../api/product");
vi.mock("../../api/cartItem");

import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as productApi from "../apis/product";
import * as cartApi from "../apis/cartItem";
import ShopPage from "../page";
import { mockCartItemResponse } from "../apis/mocks/mockCartItemResponse";
import { mockProductResponse } from "../apis/mocks/mockProductResponse";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";
import { ContextProvider } from "../context/ContextProvider";

describe("useContext 훅을 이용해서 productList를 관리한다.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("상품 목록 아이템을 불러온다.", async () => {
    vi.spyOn(productApi, "getProducts").mockResolvedValue(mockProductResponse);

    render(
      <ContextProvider>
        <ShopPage />
      </ContextProvider>
    );

    await waitFor(() => {
      const products = screen.queryAllByTestId("product-component");
      expect(products).toHaveLength(3);
    });
  });
});

describe("useContext 훅을 이용해서 cartProductList를 관리한다.", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("장바구니 아이템을 불러온다.", async () => {
    vi.spyOn(cartApi, "getCartItems").mockResolvedValue(mockCartItemResponse);

    render(
      <ContextProvider>
        <CartProductContainer />
      </ContextProvider>
    );

    await waitFor(() => {
      const cartProducts = screen.queryAllByTestId("cart-product");
      expect(cartProducts).toHaveLength(2);
    });
  });
});
