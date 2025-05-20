import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { ProductContextProvider } from "../contexts/ProductContext";
import { CartContextProvider } from "../contexts/CartContext";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";
import { OrderByOptionType } from "../types/categoryOption";

// error 토스트의 경우에는 외부에서 mock을 불러오면, 리렌더링 이슈가 생기기 떄문에,
// mock을 하나하나 세팅해줌.
interface MockProductContextType {
  productsData: Product[] | undefined;
  productFetchLoading: boolean;
  productFetchError: Error | null;
  fetchProducts: () => Promise<void>;
  orderBy: OrderByOptionType;
  setOrderBy: (orderBy: OrderByOptionType) => void;
}

interface MockCartContextType {
  cartData: CartItem[] | undefined;
  cartFetchLoading: boolean;
  cartFetchError: Error | null;
  fetchCart: () => Promise<void>;
}

let mockProductContextValue: MockProductContextType = {
  productsData: undefined,
  productFetchLoading: false,
  productFetchError: null,
  fetchProducts: vi.fn(() => Promise.resolve()),
  orderBy: "낮은 가격순",
  setOrderBy: vi.fn(),
};

let mockCartContextValue: MockCartContextType = {
  cartData: undefined,
  cartFetchLoading: false,
  cartFetchError: null,
  fetchCart: vi.fn(() => Promise.resolve()),
};

vi.mock("../contexts/ProductContext", async () => {
  const actual = await vi.importActual("../contexts/ProductContext");
  return {
    ...(actual as object),
    useProductContext: () => mockProductContextValue,
  };
});

vi.mock("../contexts/CartContext", async () => {
  const actual = await vi.importActual("../contexts/CartContext");
  return {
    ...(actual as object),
    useCartContext: () => mockCartContextValue,
  };
});

const mockShowError = vi.fn();
vi.mock("../contexts/ErrorContext", async () => {
  const actual = await vi.importActual("../contexts/ErrorContext");
  return {
    ...(actual as Record<string, unknown>),
    useErrorContext: () => ({
      showError: mockShowError,
    }),
  };
});

beforeEach(() => {
  vi.clearAllMocks();
  mockProductContextValue = {
    productsData: [],
    productFetchLoading: false,
    productFetchError: null,
    fetchProducts: vi.fn(() => Promise.resolve()),
    orderBy: "낮은 가격순",
    setOrderBy: vi.fn(),
  };
  mockCartContextValue = {
    cartData: [],
    cartFetchLoading: false,
    cartFetchError: null,
    fetchCart: vi.fn(() => Promise.resolve()),
  };
});

describe("App 에러 처리 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    mockProductContextValue.productFetchError = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    mockCartContextValue.cartFetchError = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 함", async () => {
    mockProductContextValue.productFetchError = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );
    mockCartContextValue.cartFetchError = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledTimes(2);
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("에러가 없는 경우 에러 처리가 호출되지 않아야 함", async () => {
    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(
      () => {
        expect(mockProductContextValue.fetchProducts).toHaveBeenCalled(); // Ensure fetch was called
        expect(mockCartContextValue.fetchCart).toHaveBeenCalled(); // Ensure fetch was called
      },
      { timeout: 500 }
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockShowError).not.toHaveBeenCalled();
  });

  test("네트워크 에러가 ProductContext에서 발생시 에러 토스트가 표시되어야 함", async () => {
    mockProductContextValue.productFetchError = new TypeError(
      "네트워크 에러가 발생했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "네트워크 에러가 발생했습니다.",
        })
      );
    });
  });

  test("네트워크 에러가 CartContext에서 발생시 에러 토스트가 표시되어야 함", async () => {
    mockCartContextValue.cartFetchError = new TypeError(
      "네트워크 에러가 발생했습니다."
    );

    render(
      <ErrorContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <App />
          </CartContextProvider>
        </ProductContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "네트워크 에러가 발생했습니다.",
        })
      );
    });
  });
});
