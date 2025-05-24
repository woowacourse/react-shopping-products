vi.mock("../api/product");
vi.mock("../api/cartItem");

import { server } from "../../../mocks/node";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShopPage from "../page";
import { vi, Mock } from "vitest";
import * as productApi from "../apis/product";
import * as cartApi from "../apis/cartItem";
import { mockProductResponse } from "../apis/mocks/mockProductResponse";
import { ContextProvider } from "../context/ContextProvider";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";

server.listen();

describe("장바구니 기능 테스트", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    const response = await fetch("https://example.com/products");
    const res = await response.json();

    vi.spyOn(productApi, "getProducts").mockResolvedValue(res);
    vi.spyOn(cartApi, "postCartItem").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    vi.spyOn(cartApi, "updateCartItem").mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("장바구니 버튼 클릭 시 아이템이 추가되고 수량이 갱신된다", async () => {
    vi.spyOn(cartApi, "getCartItems").mockResolvedValue({
      content: [],
    });

    render(
      <ContextProvider>
        <ShopPage />
      </ContextProvider>
    );

    const product = await screen.findByText("기세");
    expect(product).toBeInTheDocument();

    const cartButtons = screen.getAllByRole("button", { name: /(담기)/i });
    expect(cartButtons.length).toBeGreaterThan(0);

    (cartApi.getCartItems as Mock).mockResolvedValueOnce({
      content: [
        {
          id: 1,
          quantity: 1,
          product: mockProductResponse.content[0],
        },
      ],
    });

    fireEvent.click(cartButtons[0]);

    await waitFor(() => {
      const cartButtons = screen.getByTestId("cart-count");
      expect(cartButtons).toHaveTextContent("1");
    });

    expect(cartApi.postCartItem).toHaveBeenCalledWith({
      productId: mockProductResponse.content[0].id,
      quantity: 1,
    });
  });

  describe("장바구니의 '+' 또는 '-' 버튼을 누를 수 있다 ", () => {
    beforeEach(() => {
      vi.spyOn(cartApi, "getCartItems").mockResolvedValue({
        content: [
          {
            id: 1,
            quantity: 2,
            product: {
              id: 26,
              name: "기세",
              price: 100,
              imageUrl: "33",
              category: "식료품",
            },
          },
        ],
      });

      render(
        <ContextProvider>
          <CartProductContainer />
        </ContextProvider>
      );
    });

    it("장바구나 버튼 클릭 후 '+' 버튼을 누르면 수량이 추가된다", async () => {
      (cartApi.getCartItems as Mock).mockResolvedValueOnce({
        content: [
          {
            id: 1,
            quantity: 3,
            product: {
              id: 26,
              name: "기세",
              price: 100,
              imageUrl: "33",
              category: "식료품",
            },
          },
        ],
      });
      const plusButton = screen.getByTestId("quantity-plus-button");
      const quantity = screen.getByTestId("quantity-value");

      expect(quantity.textContent).toBe("2");
      fireEvent.click(plusButton);

      await waitFor(() => {
        expect(screen.getByTestId("quantity-value").textContent).toBe("3");
      });
    });

    it("장바구나 버튼 클릭 후 '-' 버튼을 누르면 수량이 추가된다", async () => {
      (cartApi.getCartItems as Mock).mockResolvedValueOnce({
        content: [
          {
            id: 1,
            quantity: 1,
            product: {
              id: 26,
              name: "기세",
              price: 100,
              imageUrl: "33",
              category: "식료품",
            },
          },
        ],
      });
      const plusButton = screen.getByTestId("quantity-minus-button");
      const quantity = screen.getByTestId("quantity-value");

      expect(quantity.textContent).toBe("2");
      fireEvent.click(plusButton);

      await waitFor(() => {
        expect(screen.getByTestId("quantity-value").textContent).toBe("1");
      });
    });
  });
});

// describe("msw를 사용해서 수량 필드가 추가된 api를 mocking한다.", () => {});
