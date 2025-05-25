import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { server } from "../../../mocks/node";

import CartProductContainer from "../components/CartProductContainer/CartProductContainer";

import { ShoppingProvider } from "../context/ShoppingProvider";
import ShopPage from "../page";
import { resetCartItems } from "../apis/mocks/handlers";

describe("장바구니 기능 테스트", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    resetCartItems();
  });

  it("장바구니 아이템을 불러온다.", async () => {
    render(
      <ShoppingProvider>
        <CartProductContainer />
      </ShoppingProvider>
    );
    const cartProducts = await screen.findAllByTestId("cart-product");
    expect(cartProducts).toHaveLength(2);
  });

  it("장바구니 버튼 클릭 시 아이템  이 추가되고 수량이 갱신된다", async () => {
    render(
      <ShoppingProvider>
        <ShopPage />
      </ShoppingProvider>
    );

    const prevCartCount = await screen.findByTestId("cart-count");
    expect(prevCartCount).toHaveTextContent("2");
    const cartButtons = await screen.findAllByTestId("add-cart-button");

    fireEvent.click(cartButtons[0]);

    const cartCount = await screen.findByTestId("cart-count");
    expect(cartCount).toHaveTextContent("3");
  });

  it("삭제 버튼 클릭 시 수량이 하나 줄어든다", async () => {
    render(
      <ShoppingProvider>
        <CartProductContainer />
      </ShoppingProvider>
    );

    const prevCartCount = await screen.findAllByTestId("cart-product");
    expect(prevCartCount.length).toBe(2);

    const deleteButtons = await screen.findAllByText("삭제");
    fireEvent.click(deleteButtons[0]);

    await waitFor(async () => {
      const updatedCartCount = await screen.findAllByTestId("cart-product");
      expect(updatedCartCount.length).toBe(1);
    });
  });

  describe("장바구니의 '+' 또는 '-' 버튼을 누를 수 있다 ", () => {
    beforeEach(async () => {
      resetCartItems();
      render(
        <ShoppingProvider>
          <CartProductContainer />
        </ShoppingProvider>
      );
    });

    it("장바구니 목록에서 '+' 버튼을 누르면 수량이 추가된다", async () => {
      const plusButton = (
        await screen.findAllByTestId("quantity-plus-button")
      )[0];
      const quantity = (await screen.findAllByTestId("quantity-value"))[0];
      const cartItem = (await screen.findAllByTestId("cart-product"))[0];

      expect(cartItem).toHaveTextContent("기세");
      expect(quantity.textContent).toBe("2");

      fireEvent.click(plusButton);

      const updatedQuantity = (
        await screen.findAllByTestId("quantity-value")
      )[0];
      expect(updatedQuantity.textContent).toBe("3");
    });

    it("장바구니 목록에서 '-' 버튼을 누르면 수량이 감소한다", async () => {
      const minusButton = (
        await screen.findAllByTestId("quantity-minus-button")
      )[0];
      const quantity = (await screen.findAllByTestId("quantity-value"))[0];
      const cartItem = (await screen.findAllByTestId("cart-product"))[0];

      expect(cartItem).toHaveTextContent("기세");
      expect(quantity.textContent).toBe("2");

      fireEvent.click(minusButton);

      const updatedQuantity = (
        await screen.findAllByTestId("quantity-value")
      )[0];

      expect(updatedQuantity.textContent).toBe("1");
    });

    it("장바구니 수량이 0개가 되면 장바구니에서 삭제된다", async () => {
      const minusButton = (
        await screen.findAllByTestId("quantity-minus-button")
      )[0];
      const quantity = (await screen.findAllByTestId("quantity-value"))[0];
      const cartItem = (await screen.findAllByTestId("cart-product"))[0];

      expect(cartItem).toHaveTextContent("기세");
      expect(quantity.textContent).toBe("2");

      fireEvent.click(minusButton);

      await waitFor(() => {
        expect(screen.getAllByTestId("quantity-value")[0].textContent).toBe(
          "1"
        );
      });

      fireEvent.click(minusButton);

      await waitFor(() => {
        const items = screen.getAllByTestId("cart-product");
        expect(items.length).toBe(1);
      });
    });
  });
});

describe("msw를 사용해서 수량 필드가 추가된 api를 mocking한다.", () => {
  beforeAll(() => server.listen());
  afterAll(() => server.close());
  afterEach(() => {
    server.resetHandlers();
    resetCartItems();
  });
  beforeEach(async () => {
    render(
      <ShoppingProvider>
        <ShopPage />
      </ShoppingProvider>
    );
  });
  it("재고를 초과하여 장바구니에 담을 수 없다", async () => {
    const plusButton = (
      await screen.findAllByTestId("quantity-plus-button")
    )[0];

    const quantity = (await screen.findAllByTestId("quantity-value"))[0];
    expect(quantity.textContent).toBe("2");

    fireEvent.click(plusButton);

    await waitFor(() => {
      const updatedQuantity = screen.getAllByTestId("quantity-value")[0];
      expect(updatedQuantity.textContent).toBe("3");
    });

    fireEvent.click(plusButton);

    await waitFor(() => {
      const errorMessage = screen.getByText(
        "재고 수량을 초과하여 담을 수 없습니다."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
