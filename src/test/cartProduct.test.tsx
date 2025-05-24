vi.mock("../api/product");
vi.mock("../api/cartItem");

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ShopPage from "../page/ShopPage";
import { vi, Mock } from "vitest";
import * as productApi from "../api/product";
import * as cartApi from "../api/cartItem";
import { mockProductResponse } from "../mock/Products";
import { ContextProvider } from "../context/ContextProvider";

describe("장바구니 추가 기능 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (productApi.getProducts as Mock).mockResolvedValue(mockProductResponse);
    (cartApi.getCartItems as Mock).mockResolvedValue({
      content: [],
    });
    (cartApi.postCartItem as Mock).mockResolvedValue({});
  });

  it("장바구니 버튼 클릭 시 아이템이 추가되고 수량이 갱신된다", async () => {
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
});
