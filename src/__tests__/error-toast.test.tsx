import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../mocks/node";
import { vi } from "vitest";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

// 에러의 경우에는 따로 mock 처리를 하여 재 렌더링 방지.
// 글로벌 단에서 mock을 하는 것 외에는 재랜더링 방지가
// 안되는것 같더군요.
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});
afterAll(() => server.close());

describe("ErrorToast 컴포넌트 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    const mockFetch = vi.fn().mockImplementation((url) => {
      if (url.toString().includes("products")) {
        return Promise.reject(
          new Error("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
        );
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ content: [] }),
      });
    });
    vi.stubGlobal("fetch", mockFetch);

    renderAppWithProviders();

    await waitFor(() => {
      const errorToast = document.getElementById("error-toast-message");
      expect(errorToast).toHaveTextContent(
        "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    const mockFetch = vi.fn().mockImplementation((url) => {
      if (url.toString().includes("cart-items")) {
        return Promise.reject(
          new Error("네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요.")
        );
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ content: [] }),
      });
    });
    vi.stubGlobal("fetch", mockFetch);

    renderAppWithProviders();

    await waitFor(() => {
      const errorToast = document.getElementById("error-toast-message");
      expect(errorToast).toHaveTextContent(
        "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
      );
    });
  });

  test("네트워크 에러 발생시 에러 토스트가 화면에 표시되어야 함", async () => {
    const mockFetch = vi.fn().mockImplementation(() => {
      return Promise.reject(
        new Error("네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요.")
      );
    });
    vi.stubGlobal("fetch", mockFetch);

    renderAppWithProviders();

    await waitFor(() => {
      const errorToast = document.getElementById("error-toast-message");
      expect(errorToast).toHaveTextContent(
        "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
      );
    });
  });

  test("여러 개의 에러가 동시에 발생했을 때 마지막 에러 토스트가 표시되어야 함", async () => {
    const mockFetch = vi.fn().mockImplementation((url) => {
      if (url.toString().includes("products")) {
        return Promise.reject(
          new Error("네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요.")
        );
      }
      if (url.toString().includes("cart-items")) {
        return Promise.reject(
          new Error("서버가 터졌습니다. 잠시후 다시 이용해 주세요.")
        );
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ content: [] }),
      });
    });
    vi.stubGlobal("fetch", mockFetch);

    renderAppWithProviders();

    await waitFor(() => {
      const errorToast = document.getElementById("error-toast-message");
      expect(errorToast).toHaveTextContent(
        "서버가 터졌습니다. 잠시후 다시 이용해 주세요."
      );
    });
  });
});
