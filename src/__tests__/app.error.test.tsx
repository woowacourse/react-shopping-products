import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { QueryContextProvider } from "../contexts/QueryContext";
import { Product } from "../types/product";
import { CartItem } from "../types/cartContents";

interface MockQueryContextType {
  query: string;
  setQuery: (query: string) => void;
}

interface MockQueryResult<T> {
  data: T | undefined;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

let mockQueryContextValue: MockQueryContextType = {
  query: "",
  setQuery: vi.fn(),
};

const defaultQueryResult = {
  data: undefined,
  isLoading: false,
  error: null,
  refetch: vi.fn(() => Promise.resolve()),
};

let mockProductsQueryResult: MockQueryResult<Product[]> = {
  ...defaultQueryResult,
  data: [],
};

let mockCartQueryResult: MockQueryResult<CartItem[]> = {
  ...defaultQueryResult,
  data: [],
};

// Add mock data for dataPool
const mockDataPool = {
  products: {
    content: [],
    totalElements: 0,
    totalPages: 0,
    size: 0,
    number: 0,
    sort: {
      empty: true,
      sorted: false,
      unsorted: true,
    },
    pageable: {
      offset: 0,
      pageNumber: 0,
      pageSize: 0,
      paged: false,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      unpaged: true,
    },
    numberOfElements: 0,
    first: true,
    last: true,
    empty: true,
  },
};

vi.mock("../contexts/QueryContext", async () => {
  const actual = await vi.importActual("../contexts/QueryContext");
  return {
    ...(actual as object),
    useQueryContext: () => ({
      ...mockQueryContextValue,
      dataPool: mockDataPool,
    }),
  };
});

vi.mock("../hooks/useGetQuery.ts", () => ({
  useGetQuery: vi.fn((queryKey: string[]) => {
    if (queryKey.includes("products")) {
      return mockProductsQueryResult;
    }
    if (queryKey.includes("cart")) {
      return mockCartQueryResult;
    }
    return defaultQueryResult;
  }),
}));

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
  mockQueryContextValue = {
    query: "",
    setQuery: vi.fn(),
  };
  mockProductsQueryResult = {
    ...defaultQueryResult,
    data: [],
  };
  mockCartQueryResult = {
    ...defaultQueryResult,
    data: [],
  };
});

describe("App 에러 처리 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    mockProductsQueryResult.error = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
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
    mockCartQueryResult.error = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
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
    mockProductsQueryResult.error = new Error(
      "제품 정보를 가져오는데 실패했습니다."
    );
    mockCartQueryResult.error = new Error(
      "장바구니 정보를 가져오는데 실패했습니다."
    );

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
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
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
      </ErrorContextProvider>
    );

    await waitFor(
      () => {
        expect(mockProductsQueryResult.refetch).toHaveBeenCalled();
        expect(mockCartQueryResult.refetch).toHaveBeenCalled();
      },
      { timeout: 500 }
    );
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(mockShowError).not.toHaveBeenCalled();
  });

  test("네트워크 에러가 ProductContext에서 발생시 에러 토스트가 표시되어야 함", async () => {
    mockProductsQueryResult.error = new TypeError(
      "네트워크 에러가 발생했습니다."
    );

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
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
    mockCartQueryResult.error = new TypeError("네트워크 에러가 발생했습니다.");

    render(
      <ErrorContextProvider>
        <QueryContextProvider>
          <App />
        </QueryContextProvider>
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
