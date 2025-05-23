import { cleanup, waitFor, screen } from "@testing-library/react";
import { vi } from "vitest";

import { testStateStore } from "../mocks/handlers";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";
import { server } from "../mocks/node";

const mockShowError = vi.fn();

vi.mock("../contexts/ErrorContext", () => ({
  useErrorContext: () => ({ showError: mockShowError, error: null }),
  ErrorContextProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("App에서는 ", () => {
  beforeEach(() => {
    // MSW 테스트 상태 초기화
    testStateStore.reset();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    // 테스트 상태 리셋
    testStateStore.reset();
    server.resetHandlers();
  });

  test("제품 정보 가져오기 실패시 해당 오류가 호출되어야 한다.", async () => {
    testStateStore.shouldFailProducts = true;

    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는 중 오류가 발생했습니다.",
        })
      );
    });
  });

  test("장바구니 정보 가져오기 실패시 해당 오류가 호출되어야 한다.", async () => {
    testStateStore.shouldFailCart = true;

    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는 중 오류가 발생했습니다.",
        })
      );
    });
  });

  test("여러 개의 에러가 발생했을 때 모든 에러가 처리되어야 한다.", async () => {
    testStateStore.shouldFailProducts = true;
    testStateStore.shouldFailCart = true;

    await renderAppWithProviders();

    await waitFor(() => {
      expect(mockShowError).toHaveBeenCalledTimes(2);
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "제품 정보를 가져오는 중 오류가 발생했습니다.",
        })
      );
      expect(mockShowError).toHaveBeenCalledWith(
        expect.objectContaining({
          message: "장바구니 정보를 가져오는 중 오류가 발생했습니다.",
        })
      );
    });
  });

  test("에러가 없는 경우 해당 오류가 호출되지 않아야 함", async () => {
    await renderAppWithProviders();

    await waitFor(() => {
      expect(screen.queryByText("마빈 잡화점")).toBeInTheDocument();
    });

    expect(mockShowError).not.toHaveBeenCalled();
  });
});
