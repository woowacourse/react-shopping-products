vi.mock("../../api/product");
vi.mock("../../api/cartItem");

import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as productApi from "../../api/product";
import * as cartApi from "../../api/cartItem";
import ShopPage from "../../page/ShopPage";
import { ContextProvider } from "./useShoppingContext";

import { mockCartItemResponse } from "../../mock/CartProducts";
import { mockProductResponse } from "../../mock/Products";
import CartProductContainer from "../../component/feature/CartProductContainer/CartProductContainer";

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
