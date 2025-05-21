import { render, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "../App";

import { mockProducts } from "../test-utils/mock-data";

const mockDataPool = {
  products: [...mockProducts],
  "cart-items": [],
};

let mockCartQueryResult = {
  loading: false,
  error: new Error("장바구니 정보를 가져오는데 실패했습니다."),
  refetch: vi.fn(),
};
let mockProductsQueryResult = {
  loading: false,
  error: new Error("제품 정보를 가져오는데 실패했습니다."),
  refetch: vi.fn(),
};
vi.mock("../contexts/QueryContext", async () => {
  const actual = await vi.importActual("../contexts/QueryContext");
  return {
    ...(actual as object),

    useQueryContext: () => ({
      dataPool: mockDataPool,
    }),
  };
});
vi.mock("../hooks/useData.ts", async () => {
  const actual = await vi.importActual("../hooks/useData.ts");
  return {
    ...(actual as object),
    useData: (key: string) => {
      if (key === "products") return mockProductsQueryResult;
      if (key === "cart-items") return mockCartQueryResult;
      return { loading: false, error: null, refetch: vi.fn() };
    },
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
});

describe("App 에러 처리 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 표시되어야 함", async () => {
    render(<App />);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는데 실패했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 함", async () => {
    render(<App />);

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
    mockProductsQueryResult.error = null;
    mockCartQueryResult.error = null;

    render(<App />);

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

  test("네트워크 에러가 product에서 발생시 에러 토스트가 표시되어야 함", async () => {
    mockProductsQueryResult.error = new TypeError(
      "네트워크 에러가 발생했습니다."
    );

    render(<App />);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "네트워크 에러가 발생했습니다.",
        })
      );
    });
  });

  test("네트워크 에러가 cart에서 발생시 에러 토스트가 표시되어야 함", async () => {
    mockCartQueryResult.error = new TypeError("네트워크 에러가 발생했습니다.");

    render(<App />);

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "네트워크 에러가 발생했습니다.",
        })
      );
    });
  });
});
