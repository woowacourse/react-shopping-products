import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useProducts from "./useProducts";

import { server } from "../mocks/server";
import { HttpResponse, http } from "msw";

describe("useProduct 훅 테스트", () => {
  it("상품 목록을 조회한다", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.products.length).toBe(20);
    });
  });

  it("상품 목록을 조회되기 이전 로딩 값은 true값이다", async () => {
    const { result } = renderHook(() => useProducts());

    expect(result.current.isLoading).toBe(true);
  });

  it("상품 목록을 조회된 이후 로딩 값은 false값이다", async () => {
    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("상품 목록을 조회 중 에러가 발생하면 error값이 반환된다", async () => {
    server.use(
      http.get("https://api.example.com/products", () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const { result } = renderHook(() => useProducts());
    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });
  });
});
