import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import ProductPage from "../ProductPage";
import { CartItemProvider } from "@/contexts/CartItemProvider";

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
        quantity: 2,
        product: {
          id: 25,
          name: "메이토",
          price: 1000,
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

vi.mock("@/apis/cartItems/addCartItems", () => ({
  addCartItems: vi.fn().mockImplementation(({ productId, quantity = 1 }) => {
    const product = {
      id: productId,
      name: "기세",
      price: 100,
      imageUrl: "33",
      category: "식료품",
    };

    const newCartItem = {
      id: mockCartItems.length + 1,
      quantity: quantity,
      product: product,
    };

    mockCartItems.push(newCartItem);

    return Promise.resolve();
  }),
}));

vi.mock("@/apis/products/getProducts", () => ({
  getProducts: vi.fn().mockResolvedValue(mockProductItems),
}));

describe("addCartItem 테스트", () => {
  it("상품에서 '담기' 버튼을 클릭했을 때 헤더에 증가한 숫자가 잘 반영된다.", async () => {
    await act(async () => {
      render(
        <CartItemProvider>
          <ProductPage />
        </CartItemProvider>
      );
    });

    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-quantity")?.textContent).toBe("1");
    });

    fireEvent.click(screen.getByText("담기"));

    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-quantity")?.textContent).toBe("2");
    });
  });
});
