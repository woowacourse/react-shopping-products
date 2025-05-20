import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import type { Mock } from "vitest";
import ProductCardList from "../src/components/ProductCardList";
import ProductListPage from "../src/pages/ProductListPage";

import { useShoppingCartContext } from "../src/contexts/shoppingCart/useShoppingCartContext";
import { useAddShoppingCart } from "../src/hooks/shoppingCart/useAddShoppingCart";
import { useDeleteShoppingCart } from "../src/hooks/shoppingCart/useDeleteShoppingCart";
import * as useProductsContextModule from "../src/contexts/products/useProductsContext";

import ShoppingCartProvider from "../src/contexts/shoppingCart/ShoppingCartProvider";
import ProductsProvider from "../src/contexts/products/ProductsProvider";
import { mockProducts } from "./mockProducts";

vi.mock("../src/contexts/shoppingCart/useShoppingCartContext");
vi.mock("../src/hooks/shoppingCart/useAddShoppingCart");
vi.mock("../src/hooks/shoppingCart/useDeleteShoppingCart");
vi.mock("../src/contexts/products/useProductsContext");

describe("장바구니 테스트", () => {
  const renderWithProviders = (ui: React.ReactNode) =>
    render(
      <ProductsProvider>
        <ShoppingCartProvider>{ui}</ShoppingCartProvider>
      </ProductsProvider>
    );

  beforeEach(() => {
    (useShoppingCartContext as Mock).mockReturnValue({
      cartItems: [{ id: 999, product: mockProducts[0] }],
      shoppingCartError: { isError: false, errorMessage: "" },
      isShoppingLoading: false,
    });

    (useAddShoppingCart as Mock).mockReturnValue({
      handleAdd: vi.fn(),
      error: { isError: false, errorMessage: "" },
    });

    (useDeleteShoppingCart as Mock).mockReturnValue({
      handleDelete: vi.fn(),
      error: { isError: false, errorMessage: "" },
    });

    (useProductsContextModule.useProductsContext as Mock).mockReturnValue({
      products: mockProducts,
      productsError: { isError: false, errorMessage: "" },
      isProductsLoading: false,
      handleChangeSort: vi.fn(),
      handleChangeCategory: vi.fn(),
    });
  });

  it("장바구니에 아이템을 담을 수 있다", () => {
    renderWithProviders(<ProductCardList products={mockProducts} />);
    const addButtons = screen.getAllByRole("button", { name: /담기/i });
    fireEvent.click(addButtons[0]);
    expect(useAddShoppingCart(1).handleAdd).toHaveBeenCalled();
  });

  it("장바구니에서 아이템을 삭제할 수 있다", () => {
    renderWithProviders(<ProductCardList products={mockProducts} />);
    const removeButtons = screen.getAllByRole("button", { name: /빼기/i });
    fireEvent.click(removeButtons[0]);
    expect(useDeleteShoppingCart().handleDelete).toHaveBeenCalled();
  });

  it("장바구니 담기 실패 시 전역 에러 메시지가 표시된다", () => {
    (useShoppingCartContext as Mock).mockReturnValue({
      cartItems: [],
      shoppingCartError: {
        isError: true,
        errorMessage: "장바구니 담기 실패",
      },
      isShoppingLoading: false,
    });

    renderWithProviders(<ProductListPage />);
    expect(screen.getByText("장바구니 담기 실패")).not.toBeNull();
  });
});
