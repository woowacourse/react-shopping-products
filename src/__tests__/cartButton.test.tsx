// CartButton.test.tsx
import { render, screen } from "@testing-library/react";
import CartButton from "../components/CartButton/CartButton";
import { vi } from "vitest";

// useFetch mocking
vi.mock("../hooks/useFetch", () => ({
  default: vi.fn((url: string, config?: RequestInit, immediate = true) => {
    if (config?.method === "POST") {
      return {
        fetcher: vi.fn().mockResolvedValue({}),
        error: null,
      };
    }

    if (config?.method === "DELETE") {
      return {
        fetcher: vi.fn().mockResolvedValue({}),
        error: null,
      };
    }

    return { fetcher: vi.fn(), error: null };
  }),
}));

vi.mock("../contexts/CartContext", () => ({
  useCartContext: () => ({
    cartLength: 1,
  }),
}));

// ErrorContext 내부에서 showError 호출 여부 확인 가능하게 spy 처리
const mockShowError = vi.fn();
vi.mock("../contexts/ErrorContext", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useErrorContext: () => ({
      showError: mockShowError,
    }),
  };
});

describe("CartButton 컴포넌트", () => {
  const mockRefetchCart = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("장바구니에 상품이 없을 때 '담기' 버튼이 표시됨", () => {
    render(
      <CartButton
        isInCart={false}
        refetchCart={mockRefetchCart}
        productId={1}
      />
    );

    expect(screen.getByText("담기")).toBeInTheDocument();
  });

  test("장바구니에 상품이 있을 때 '빼기' 버튼이 표시됨", () => {
    render(
      <CartButton
        isInCart={true}
        refetchCart={mockRefetchCart}
        productId={1}
        cartItemId={1}
      />
    );

    expect(screen.getByText("빼기")).toBeInTheDocument();
  });
});
