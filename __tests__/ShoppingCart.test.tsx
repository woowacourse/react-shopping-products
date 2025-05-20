import { fireEvent, render, screen } from "@testing-library/react";
import { Product } from "../src/types/product.type";
import ProductCardList from "../src/components/ProductCardList/index";
import { vi } from "vitest";
import type { Mock } from "vitest";
import { useShoppingCartContext } from "../src/contexts/shoppingCart/useShoppingCartContext";
import { useAddShoppingCart } from "../src/hooks/shoppingCart/useAddShoppingCart";
import { useDeleteShoppingCart } from "../src/hooks/shoppingCart/useDeleteShoppingCart";
import ShoppingCartProvider from "../src/contexts/shoppingCart/ShoppingCartProvider";
import ProductsProvider from "../src/contexts/products/ProductsProvider";

vi.mock("../src/contexts/shoppingCart/useShoppingCartContext");
vi.mock("../src/hooks/shoppingCart/useAddShoppingCart");
vi.mock("../src/hooks/shoppingCart/useDeleteShoppingCart");

describe("장바구니 테스트", () => {
  const mockProducts: Product[] = Array.from({ length: 20 }, (_, index) => ({
    id: index + 1,
    name: `테스트 상품 ${index + 1}`,
    price: 1000 + index * 100,
    imageUrl: `/images/test${index + 1}.png`,
    category: index % 2 === 0 ? "식료품" : "패션잡화",
  }));

  const mockAdd = vi.fn();
  const mockDelete = vi.fn();

  beforeEach(() => {
    (useShoppingCartContext as Mock).mockReturnValue({
      cartItems: [
        {
          id: 999,
          product: mockProducts[0],
        },
      ],
    });

    (useAddShoppingCart as Mock).mockReturnValue({
      handleAdd: mockAdd,
    });

    (useDeleteShoppingCart as Mock).mockReturnValue({
      handleDelete: mockDelete,
    });
  });

  it("장바구니에 아이템을 담을 수 있다.", () => {
    render(
      <ProductsProvider>
        <ShoppingCartProvider>
          <ProductCardList products={mockProducts} />
        </ShoppingCartProvider>
      </ProductsProvider>
    );

    const addButtons = screen.getAllByRole("button", { name: /담기/i });
    fireEvent.click(addButtons[0]);
    expect(mockAdd).toHaveBeenCalled();
  });

  it("장바구니에서 아이템을 삭제할 수 있다.", () => {
    render(
      <ProductsProvider>
        <ShoppingCartProvider>
          <ProductCardList products={mockProducts} />
        </ShoppingCartProvider>
      </ProductsProvider>
    );

    const removeButtons = screen.getAllByRole("button", { name: /빼기/i });
    fireEvent.click(removeButtons[0]);
    expect(mockDelete).toHaveBeenCalled();
  });
});
