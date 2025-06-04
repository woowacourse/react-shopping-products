import React from "react";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as apiModule from "../../src/api/product/getProducts";
import {
  ProductsApiProvider,
  useProductsApi,
} from "../../src/domain/contexts/ProductApiContext";

function TestComponent() {
  const { productsData, productsStatus, productsError, refetchProducts } =
    useProductsApi();

  return (
    <div>
      <div data-testid="status">{productsStatus}</div>
      <div data-testid="error">{productsError}</div>
      <div data-testid="length">{productsData ? productsData.length : 0}</div>
      <button
        onClick={() => refetchProducts("categoryTest", "price,asc")}
        data-testid="refetch"
      >
        refetch
      </button>
    </div>
  );
}

describe("useProductsApi", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("성공적으로 데이터를 가져오면 productsStatus가 'success'가 되고 productsData가 설정된다", async () => {
    const fakeResponse = {
      content: [
        {
          id: 1,
          name: "테스트 상품1",
          price: 1000,
          imageUrl: "",
          category: "test",
        },
        {
          id: 2,
          name: "테스트 상품2",
          price: 2000,
          imageUrl: "",
          category: "test",
        },
      ],
    };

    vi.spyOn(apiModule, "default").mockResolvedValue(fakeResponse);

    render(
      <ProductsApiProvider>
        <TestComponent />
      </ProductsApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("success");
    });

    expect(screen.getByTestId("length").textContent).toBe("2");
    expect(screen.getByTestId("error").textContent).toBe("");
  });

  it("API 호출이 실패하면 productsStatus가 'error'가 되고 productsError가 설정된다", async () => {
    vi.spyOn(apiModule, "default").mockRejectedValue(
      new Error("네트워크 오류")
    );

    render(
      <ProductsApiProvider>
        <TestComponent />
      </ProductsApiProvider>
    );
    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("error");
    });

    expect(screen.getByTestId("error").textContent).toBe("네트워크 오류");
    expect(screen.getByTestId("length").textContent).toBe("0");
  });

  it("refetchProducts를 호출하면 다시 API를 호출한다", async () => {
    const fakeResponse1 = {
      content: [
        {
          id: 1,
          name: "테스트1",
          price: 1000,
          imageUrl: "",
          category: "test",
        },
      ],
    };
    const fakeResponse2 = {
      content: [
        {
          id: 2,
          name: "테스트2",
          price: 2000,
          imageUrl: "",
          category: "test",
        },
      ],
    };

    const spy = vi.spyOn(apiModule, "default");
    spy
      .mockResolvedValueOnce(fakeResponse1)
      .mockResolvedValueOnce(fakeResponse2);

    render(
      <ProductsApiProvider>
        <TestComponent />
      </ProductsApiProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status").textContent).toBe("success");
    });
    expect(screen.getByTestId("length").textContent).toBe("1");

    await userEvent.click(screen.getByTestId("refetch"));

    await waitFor(() => {
      expect(screen.getByTestId("length").textContent).toBe("1");
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
