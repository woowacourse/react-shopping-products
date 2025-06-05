// @vitest-environment jsdom
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ToastProvider } from "../provider/ToastProvider";
import { DataProvider } from "../provider/DataProvider";
import App from "../App";
import CartModal from "../components/cartModal/CartModal";
import { vi } from "vitest";
import "@testing-library/jest-dom";

describe("CartModal 컴포넌트", () => {
  const renderApp = () => {
    return render(
      <DataProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </DataProvider>
    );
  };

  it("상품을 장바구니에 담으면 모달에서 확인할 수 있다", async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText("망고")).toBeInTheDocument();
    });

    const addButton = screen.getAllByText("담기");
    fireEvent.click(addButton[0]);

    const cartImg = screen.getByAltText("장바구니 아이콘");
    const cartButton = cartImg.closest("button");
    fireEvent.click(cartButton!);

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });

    await waitFor(() => {
      const modalProduct = screen.getAllByText("망고")[1];
      expect(modalProduct).toBeInTheDocument();
    });
  });

  it("장바구니에서 상품을 삭제할 수 있다", async () => {
    renderApp();

    await waitFor(() => {
      expect(screen.getByText("망고")).toBeInTheDocument();
    });

    const cartImg = screen.getByAltText("장바구니 아이콘");
    const cartButton = cartImg.closest("button");
    fireEvent.click(cartButton!);

    await waitFor(() => {
      expect(screen.getByText("장바구니")).toBeInTheDocument();
    });

    await waitFor(() => {
      const modalProduct = screen.getAllByText("망고")[1];
      expect(modalProduct).toBeInTheDocument();
    });

    const deleteButton = await screen.findByText("삭제");
    fireEvent.click(deleteButton);

    await waitFor(() => {
      const modalProducts = screen.queryAllByText("망고");
      expect(modalProducts).toHaveLength(1);
      expect(modalProducts[0]).toBeInTheDocument();
    });
  });

  it("모달 닫기 버튼을 클릭하면 모달이 닫힌다", async () => {
    const onClose = vi.fn();
    render(
      <DataProvider>
        <ToastProvider>
          <CartModal onClose={onClose} />
        </ToastProvider>
      </DataProvider>
    );

    const closeButton = screen.getByText("닫기");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
