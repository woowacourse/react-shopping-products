import { renderHook, waitFor } from "@testing-library/react";
import { expect, Mock, vi } from "vitest";
import { CartItemsAPI } from "../apis/cartItems";
import useCartItems from "../hooks/useCartItems";
import { act } from "react";

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

describe("useCartItems 훅 - 장바구니의 상품 개수 표시 기능", () => {
  const mockSetErrorMessage = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("초기 상태가 올바르게 설정된다.", async () => {
    (CartItemsAPI.get as Mock).mockResolvedValue(emptyCartItems);

    const { result } = renderHook(() => useCartItems(mockSetErrorMessage));

    await waitFor(() => {
      expect(CartItemsAPI.get).toHaveBeenCalled();
    });

    expect(result.current.cartItemsCount).toBe(0);
    expect(result.current.isProductInCart(1)).toBe(false);
    expect(result.current.isProductInCart(2)).toBe(false);
  });

  it("장바구니에 여러 상품이 있을 경우, 장바구니 상품의 정확한 개수를 반환하고, 상품 포함 여부를 올바르게 확인한다.", async () => {
    (CartItemsAPI.get as Mock).mockResolvedValue(cartWithTwoItems);

    const { result } = renderHook(() => useCartItems(mockSetErrorMessage));

    await waitFor(() => {
      expect(CartItemsAPI.get).toHaveBeenCalled();
    });

    expect(result.current.cartItemsCount).toBe(2);

    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(true);
    expect(result.current.isProductInCart(3)).toBe(false);
  });

  it("handleCartItemToggle로 상품을 장바구니에 추가할 수 있다.", async () => {
    (CartItemsAPI.get as Mock)
      .mockResolvedValueOnce(emptyCartItems)
      .mockResolvedValueOnce(cartWithOneItem);

    (CartItemsAPI.post as Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCartItems(mockSetErrorMessage));

    await waitFor(() => {
      expect(CartItemsAPI.get).toHaveBeenCalled();
    });

    expect(result.current.cartItemsCount).toBe(0);

    await act(async () => {
      await result.current.handleCartItemToggle(1);
    });

    expect(CartItemsAPI.post).toHaveBeenCalledWith(1);
    expect(CartItemsAPI.get).toHaveBeenCalledTimes(2);

    expect(result.current.cartItemsCount).toBe(1);
    expect(result.current.isProductInCart(1)).toBe(true);
  });

  it("handleCartItemToggle로 상품을 장바구니에서 제거할 수 있다.", async () => {
    (CartItemsAPI.get as Mock)
      .mockResolvedValueOnce(cartWithTwoItems)
      .mockResolvedValueOnce(cartWithOneItem);

    (CartItemsAPI.delete as Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCartItems(mockSetErrorMessage));

    await waitFor(() => {
      expect(CartItemsAPI.get).toHaveBeenCalled();
    });

    expect(result.current.cartItemsCount).toBe(2);
    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(true);

    await act(async () => {
      await result.current.handleCartItemToggle(2);
    });

    expect(CartItemsAPI.delete).toHaveBeenCalledWith(101);
    expect(CartItemsAPI.get).toHaveBeenCalledTimes(2);

    expect(result.current.cartItemsCount).toBe(1);
    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(false);
  });

  it("연속적으로 상품 추가 및 제거하는 경우에도 올바르게 작동한다.", async () => {
    (CartItemsAPI.get as Mock)
      .mockResolvedValueOnce(emptyCartItems)
      .mockResolvedValueOnce(cartWithOneItem)
      .mockResolvedValueOnce(cartWithTwoItems)
      .mockResolvedValueOnce(cartWithOneItem);

    (CartItemsAPI.post as Mock).mockResolvedValue(undefined);
    (CartItemsAPI.delete as Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useCartItems(mockSetErrorMessage));

    await waitFor(() => {
      expect(CartItemsAPI.get).toHaveBeenCalled();
    });
    expect(result.current.cartItemsCount).toBe(0);

    await act(async () => {
      await result.current.handleCartItemToggle(1);
    });
    expect(CartItemsAPI.post).toHaveBeenCalledWith(1);
    expect(result.current.cartItemsCount).toBe(1);
    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(false);

    await act(async () => {
      await result.current.handleCartItemToggle(2);
    });
    expect(CartItemsAPI.post).toHaveBeenCalledWith(2);
    expect(result.current.cartItemsCount).toBe(2);
    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(true);

    await act(async () => {
      await result.current.handleCartItemToggle(2);
    });
    expect(CartItemsAPI.delete).toHaveBeenCalledWith(101);
    expect(result.current.cartItemsCount).toBe(1);
    expect(result.current.isProductInCart(1)).toBe(true);
    expect(result.current.isProductInCart(2)).toBe(false);
  });
});
