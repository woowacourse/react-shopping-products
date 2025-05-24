import { render, screen } from "@testing-library/react";
import { server } from "../../../mocks/node";
import { ProductType } from "../apis/types/product";

import ShopPage from "../page";
import { mockProductResponse } from "../apis/mocks/mockProductResponse";
import { ShoppingProvider } from "../context/ShoppingProvider";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("msw를 사용해서 수량 필드가 추가된 api를 mocking한다.", () => {
  it("상품 목록에서 수량 필드를 확인할 수 있다. ", async () => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/products`);
    const res = await response.json();
    res.content.forEach((product: ProductType) => {
      expect(product).toHaveProperty("quantity");
    });
  });

  it("서버에서 모킹된 데이터를 불러올 수 있다", async () => {
    render(
      <ShoppingProvider>
        <ShopPage />
      </ShoppingProvider>
    );

    const product = await screen.findAllByTestId("product-component");

    expect(product.length).toBe(mockProductResponse.content.length);
  });
});
