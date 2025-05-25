import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ShoppingProvider } from "../context/ShoppingProvider";
import ShopPage from "../page";

describe("모달이 열리고 닫힌다.", () => {
  it("장바구니 버튼 클릭 시 모달이 열린다", async () => {
    render(
      <ShoppingProvider>
        <ShopPage />
      </ShoppingProvider>
    );

    const cartButton = await screen.findByTestId("cart-icon");
    fireEvent.click(cartButton);

    const modal = await screen.findByTestId("modal");
    expect(modal).toBeVisible();
  });

  describe("사용자 액션에 따라 모달이 닫힌다", () => {
    let cartButton: HTMLElement;
    let modal: HTMLElement;

    beforeEach(async () => {
      render(
        <ShoppingProvider>
          <ShopPage />
        </ShoppingProvider>
      );
      cartButton = await screen.findByTestId("cart-icon");
      fireEvent.click(cartButton);

      modal = await screen.findByTestId("modal");
      expect(modal).toBeVisible();
    });

    it("모달 바깥(backdrop) 클릭 시 모달이 닫힌다", async () => {
      const backdrop = await screen.findByTestId("modal-backdrop");
      fireEvent.mouseDown(backdrop);
      fireEvent.click(backdrop);

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).not.toBeVisible();
      });
    });

    it("모달 닫기 버튼 클릭 시 모달이 닫힌다", async () => {
      const closeButton = await screen.findByText("닫기");
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId("modal")).not.toBeVisible();
      });
    });
  });
});
