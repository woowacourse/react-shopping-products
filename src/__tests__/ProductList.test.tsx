import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import "@testing-library/jest-dom";
import ProductList from "../components/Product/ProductList/ProductList";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";

// Mock the ProductCard component

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({
    showError: vi.fn(),
  }),
}));

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    setCartLength: vi.fn(),
    cartLength: 1,
  }),
}));

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    price: 10000,
    category: "Category A",
    imageUrl: "image1.jpg",
  },
  {
    id: 2,
    name: "Product 2",
    price: 20000,
    category: "Category B",
    imageUrl: "image2.jpg",
  },
];

const mockCartItems: CartItem[] = [
  {
    id: 101,
    product: {
      id: 1,
      name: "Product 1",
      price: 10000,
      category: "Category A",
      imageUrl: "image1.jpg",
    },
    quantity: 1,
  },
];

describe("ProductList는 ", () => {
  it("아이템을 정상적으로 출력해야한다.", () => {
    render(<ProductList products={mockProducts} cartItems={mockCartItems} />);

    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
    expect(screen.getByText("10,000원")).toBeInTheDocument();
    expect(screen.getByText("20,000원")).toBeInTheDocument();
  });

  it("상품이 없을 경우 상품이 없다는 메시지를 출력해야한다.", () => {
    render(<ProductList products={[]} cartItems={mockCartItems} />);

    expect(screen.getByText("상품이 없습니다.")).toBeInTheDocument();
  });

  it("product를 받지 못했을경우, 서버와 연결이 좋지 않다는 메시지를 출력해야한다.", () => {
    render(<ProductList products={undefined} cartItems={mockCartItems} />);

    expect(
      screen.getByText("서버와 연결이 좋지 않아요. 다시 시도해주세요.")
    ).toBeInTheDocument();
  });
});
