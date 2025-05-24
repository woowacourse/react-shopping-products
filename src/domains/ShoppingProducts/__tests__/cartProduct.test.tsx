import { fireEvent, render, screen } from "@testing-library/react";
import { server } from "../../../mocks/node";
import { resetCartItems } from "../apis/mocks/handlers/cartHandlers";
import CartProductContainer from "../components/CartProductContainer/CartProductContainer";
import { ContextProvider } from "../context/ContextProvider";
import ShopPage from "../page";

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  resetCartItems();
});

describe.skip("장바구니 기능 테스트", () => {
  it("장바구니 아이템을 불러온다.", async () => {
    render(
      <ContextProvider>
        <CartProductContainer />
      </ContextProvider>
    );
    const cartProducts = await screen.findAllByTestId("cart-product");
    expect(cartProducts).toHaveLength(2);
  });

  it("장바구니 버튼 클릭 시 아이템이 추가되고 수량이 갱신된다", async () => {
    render(
      <ContextProvider>
        <ShopPage />
      </ContextProvider>
    );

    const prevCartCount = await screen.findByTestId("cart-count");
    expect(prevCartCount).toHaveTextContent("2");
    const cartButtons = await screen.findAllByTestId("add-cart-button");

    fireEvent.click(cartButtons[0]);

    const cartCount = await screen.findByTestId("cart-count");
    expect(cartCount).toHaveTextContent("3");
  });

  describe("장바구니의 '+' 또는 '-' 버튼을 누를 수 있다 ", () => {
    let plusButton: HTMLElement;
    let minusButton: HTMLElement;
    let quantity: HTMLElement;

    beforeEach(async () => {
      render(
        <ContextProvider>
          <CartProductContainer />
        </ContextProvider>
      );

      plusButton = (await screen.findAllByTestId("quantity-plus-button"))[0];
      minusButton = (await screen.findAllByTestId("quantity-minus-button"))[0];
      quantity = (await screen.findAllByTestId("quantity-value"))[0];
    });

    it("장바구니 목록에서 '+' 버튼을 누르면 수량이 추가된다", async () => {
      expect(quantity.textContent).toBe("2");
      fireEvent.click(plusButton);

      const updatedQuantity = (
        await screen.findAllByTestId("quantity-value")
      )[0];
      expect(updatedQuantity.textContent).toBe("3");
    });

    it("장바구니 목록에서 '-' 버튼을 누르면 수량이 감소한다", async () => {
      expect(quantity.textContent).toBe("3");
      fireEvent.click(minusButton);

      const updatedQuantity = (
        await screen.findAllByTestId("quantity-value")
      )[0];

      expect(updatedQuantity.textContent).toBe("2");
    });

    it("장바구니 수량이 0개가 되면 장바구니에서 삭제된다", async () => {
      expect(quantity.textContent).toBe("2");
      fireEvent.click(minusButton);
      fireEvent.click(minusButton);

      const updatedCartItem = await screen.findAllByTestId("cart-product");
      expect(updatedCartItem.length).toBe(2);
    });
  });
});

describe("msw를 사용해서 수량 필드가 추가된 api를 mocking한다.", () => {
  it("재고를 초과하여 장바구니에 담을 수 없다", async () => {
    render(
      <ContextProvider>
        <ShopPage />
      </ContextProvider>
    );

    const plusButton = (
      await screen.findAllByTestId("quantity-plus-button")
    )[0];

    let quantity: HTMLElement;
    quantity = (await screen.findAllByTestId("quantity-value"))[0];
    expect(quantity.textContent).toBe("2");

    fireEvent.click(plusButton);

    quantity = (await screen.findAllByTestId("quantity-value"))[0];
    expect(quantity.textContent).toBe("3");

    fireEvent.click(plusButton);

    const errorMessage = await screen.findByText(
      "재고 수량을 초과하여 담을 수 없습니다."
    );
    expect(errorMessage).toBeInTheDocument();
  });
});
