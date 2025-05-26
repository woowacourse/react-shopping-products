import { render, screen, act, waitFor } from "@testing-library/react";
import { DataProvider } from "@/context/DataContext";
import App from "@/App";

const { mockProductItems } = vi.hoisted(() => {
  return {
    mockProductItems: [
      {
        id: 26,
        name: "기세",
        price: 100,
        imageUrl: "33",
        category: "식료품",
      },
    ],
  };
});

const { mockCartItems } = vi.hoisted(() => {
  return {
    mockCartItems: [
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
  };
});

vi.mock("@/apis/cartItems/getCartItems", () => ({
  getCartItems: vi
    .fn()
    .mockImplementation(() => Promise.resolve([...mockCartItems])),
}));

vi.mock("@/apis/cartItems/removeCartItem", () => ({
  removeCartItem: vi.fn().mockImplementation((id) => {
    const index = mockCartItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      mockCartItems.splice(index, 1);
    }
    return Promise.resolve();
  }),
}));

vi.mock("@/apis/products/getProducts", () => ({
  getProducts: vi.fn().mockResolvedValue(mockProductItems),
}));

describe("ProductPage Component", () => {
  it("상품에서 '빼기' 버튼을 클릭했을 때 헤더에 감소한 숫자가 잘 반영된다.", async () => {
    await act(async () => {
      render(
        <DataProvider>
          <App />
        </DataProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-quantity")?.textContent).toBe("1");
    });

    screen.queryByTestId("decrease-button")?.click();

    await waitFor(() => {
      expect(
        screen.queryByTestId("cart-item-quantity")
      ).not.toBeInTheDocument();
    });
  });
});
