import { describe, test, expect, vi, beforeEach } from "vitest";
import * as cartApi from "../api/cartItems";
import { resetCartItems, mockCartItems } from "../mocks/data/cartItems";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { DataProvider } from "../contexts/DataContext";

vi.mock("../api/cartItems");

beforeEach(() => {
  resetCartItems();
  vi.clearAllMocks();
});

describe("CartModal 기능 테스트", () => {
  test("초기 mockCartItems에는 두 개의 상품이 포함되어 있다", () => {
    expect(mockCartItems.length).toBe(2);
    expect(mockCartItems[0].product.name).toBeDefined();
  });

  test("상품 수량 증가 시 postCartItems가 호출된다", async () => {
    vi.mocked(cartApi.postCartItems).mockResolvedValue(undefined);
    await cartApi.postCartItems(1, 1);
    expect(cartApi.postCartItems).toHaveBeenCalledWith(1, 1);
  });

  test("상품 삭제 시 deleteCartItem이 호출된다", async () => {
    vi.mocked(cartApi.deleteCartItem).mockResolvedValue(undefined);
    await cartApi.deleteCartItem(1);
    expect(cartApi.deleteCartItem).toHaveBeenCalledWith(1);
  });

  test("장바구니 총 결제 금액이 올바르게 계산된다", () => {
    const total = mockCartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );

    expect(total).toBe(
      mockCartItems[0].product.price * mockCartItems[0].quantity +
        mockCartItems[1].product.price * mockCartItems[1].quantity,
    );
  });

  test("재고 초과 시 에러를 throw한다", async () => {
    vi.mocked(cartApi.postCartItems).mockRejectedValue({
      response: {
        status: 400,
        data: {
          errorCode: "OUT_OF_STOCK",
        },
      },
    });

    await expect(cartApi.postCartItems(1, 999)).rejects.toMatchObject({
      response: {
        status: 400,
        data: { errorCode: "OUT_OF_STOCK" },
      },
    });
  });

  test("장바구니 버튼을 클릭하면 모달이 열린다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    expect(await screen.findByText("장바구니")).toBeInTheDocument();
  });

  test("장바구니에 상품을 담고 → 모달을 열면 상품이 보인다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const addButtons = await screen.findAllByText("담기");
    fireEvent.click(addButtons[0]);

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    const item = await screen.findByText((text) => text.includes("상품"));
    expect(item).toBeInTheDocument();
  });

  test("닫기 버튼을 누르면 모달이 닫힌다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    const closeButton = await screen.findByText("닫기");
    fireEvent.click(closeButton);

    expect(screen.queryByText("장바구니")).not.toBeInTheDocument();
  });

  test("배경을 클릭하면 모달이 닫힌다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    await screen.findByText("장바구니");

    const overlay = screen.getByTestId("overlay");
    fireEvent.click(overlay);

    expect(screen.queryByText("장바구니")).not.toBeInTheDocument();
  });

  test("ESC 키를 누르면 모달이 닫힌다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    fireEvent.keyDown(window, { key: "Escape" });
    expect(await screen.queryByText("장바구니")).not.toBeInTheDocument();
  });

  test("상품 삭제 버튼 클릭 시 해당 상품이 사라진다", async () => {
    render(
      <DataProvider>
        <App />
      </DataProvider>,
    );

    const addButtons = await screen.findAllByText("담기");
    fireEvent.click(addButtons[0]);

    const basketIcon = screen.getByAltText("basket");
    fireEvent.click(basketIcon);

    const deleteButtons = await screen.findAllByText("삭제");
    fireEvent.click(deleteButtons[0]);

    expect(
      screen.queryByText((text) => text.includes("상품 1")),
    ).not.toBeInTheDocument();
  });
});
