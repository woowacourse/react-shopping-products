import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/node";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";
import { ContextProvider } from "../context/ContextProvider";
import ShopPage from "../page";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

describe("장바구니 기능 테스트", () => {
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

    fireEvent.click(cartButtons[0]);

    await waitFor(() => {
      const cartButtons = screen.getByTestId("cart-count");
      expect(cartButtons).toHaveTextContent("1");
    });
  });

  describe("장바구니의 '+' 또는 '-' 버튼을 누를 수 있다 ", () => {
    beforeEach(() => {
      render(
        <ContextProvider>
          <CartProductContainer />
        </ContextProvider>
      );
    });

    it("장바구나 버튼 클릭 후 '+' 버튼을 누르면 수량이 추가된다", async () => {
      const plusButton = screen.getByTestId("quantity-plus-button");
      const quantity = screen.getByTestId("quantity-value");

      expect(quantity.textContent).toBe("2");
      fireEvent.click(plusButton);

      await waitFor(() => {
        expect(screen.getByTestId("quantity-value").textContent).toBe("3");
      });
    });

    it("장바구나 버튼 클릭 후 '-' 버튼을 누르면 수량이 추가된다", async () => {
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
