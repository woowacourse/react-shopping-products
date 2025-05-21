import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, Mock, vi } from "vitest";
import App from "../App";
import { CartItemsAPI } from "../apis/cartItems";
import { ProductsAPI } from "../apis/products";

vi.mock("../apis/products", () => ({
  ProductsAPI: {
    get: vi.fn(),
  },
}));

vi.mock("../apis/cartItems", () => ({
  CartItemsAPI: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

const mockProducts = {
  content: [
    {
      id: 1,
      name: "테스트 상품1",
      price: 10000,
      imageUrl: "/test1.jpg",
      category: "식료품",
    },
    {
      id: 2,
      name: "테스트 상품2",
      price: 20000,
      imageUrl: "/test2.jpg",
      category: "패션잡화",
    },
  ],
  totalElements: 2,
  totalPages: 1,
  size: 2,
  number: 0,
  sort: { empty: false, sorted: true, unsorted: false },
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
    sort: { empty: false, sorted: true, unsorted: false },
  },
  numberOfElements: 2,
  first: true,
  last: true,
  empty: false,
};

const emptyCartItems = {
  content: [],
  totalElements: 0,
  totalPages: 0,
  size: 0,
  number: 0,
  sort: { empty: false, sorted: true, unsorted: false },
  pageable: {
    offset: 0,
    pageNumber: 0,
    pageSize: 50,
    paged: true,
    unpaged: false,
    sort: { empty: false, sorted: true, unsorted: false },
  },
  numberOfElements: 0,
  first: true,
  last: true,
  empty: true,
};

const cartWithOneItem = {
  ...emptyCartItems,
  content: [
    {
      id: 100,
      quantity: 1,
      product: mockProducts.content[0],
    },
  ],
  totalElements: 1,
  numberOfElements: 1,
  empty: false,
};

const cartWithTwoItems = {
  ...emptyCartItems,
  content: [
    {
      id: 100,
      quantity: 1,
      product: mockProducts.content[0],
    },
    {
      id: 101,
      quantity: 1,
      product: mockProducts.content[1],
    },
  ],
  totalElements: 2,
  numberOfElements: 2,
  empty: false,
};

describe("장바구니의 상품 개수 표시 기능 테스트", () => {
  beforeEach(() => {
    vi.resetAllMocks();

    (ProductsAPI.get as Mock).mockResolvedValue(mockProducts);
  });

  test("사용자가 상품을 장바구니에 추가하면, 헤더에 표시된 장바구니 상품 개수가 해당 수만큼 증가한다.", async () => {
    (CartItemsAPI.get as Mock)
      .mockResolvedValueOnce(emptyCartItems)
      .mockResolvedValueOnce(cartWithOneItem)
      .mockResolvedValueOnce(cartWithTwoItems);

    (CartItemsAPI.post as Mock).mockResolvedValue(undefined);

    render(<App />);

    expect(await screen.findByText("테스트 상품1")).toBeInTheDocument();
    expect(await screen.findByText("테스트 상품2")).toBeInTheDocument();

    expect(screen.queryByTestId("cart-item-count")).not.toBeInTheDocument();

    const addButtons = screen.getAllByText("담기");

    fireEvent.click(addButtons[0]);
    expect(CartItemsAPI.post).toHaveBeenCalledWith(1);
    expect(await screen.findByTestId("cart-item-count")).toHaveTextContent("1");

    fireEvent.click(addButtons[1]);
    expect(CartItemsAPI.post).toHaveBeenCalledWith(2);
    expect(await screen.findByTestId("cart-item-count")).toHaveTextContent("2");
  });

  test("사용자가 상품을 장바구니에서 삭제하면, 헤더에 표시된 장바구니 상품 개수가 해당 수만큼 감소한다.", async () => {
    (CartItemsAPI.get as Mock)
      .mockResolvedValueOnce(cartWithTwoItems)
      .mockResolvedValueOnce(cartWithOneItem)
      .mockResolvedValueOnce(emptyCartItems);

    render(<App />);

    expect(await screen.findByText("테스트 상품1")).toBeInTheDocument();
    expect(await screen.findByText("테스트 상품2")).toBeInTheDocument();

    expect(screen.getByTestId("cart-item-count")).toHaveTextContent("2");

    const removeButtons = screen.getAllByText("빼기");

    fireEvent.click(removeButtons[1]);
    expect(CartItemsAPI.delete).toHaveBeenCalledWith(101);
    expect(await screen.findByTestId("cart-item-count")).toHaveTextContent("1");

    fireEvent.click(removeButtons[0]);
    expect(CartItemsAPI.delete).toHaveBeenCalledWith(100);
    await waitFor(() => {
      expect(screen.queryByTestId("cart-item-count")).not.toBeInTheDocument();
    });
  });
});
