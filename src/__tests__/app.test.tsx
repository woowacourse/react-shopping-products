import { act, cleanup, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, beforeEach, afterEach, expect } from "vitest";
import "@testing-library/jest-dom";
import { testStateStore } from "../mocks/handlers";
import { server } from "../mocks/node";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

describe("App에서는 ", () => {
  beforeEach(() => {
    testStateStore.reset();
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    testStateStore.reset();
    server.resetHandlers();
  });

  describe("초기화 단계에서는", () => {
    it("컴포넌트가 정상적으로 렌더링된다", async () => {
      await act(async () => {
        await renderAppWithProviders();
      });
      expect(screen.getByText("마빈 잡화점")).toBeInTheDocument();
      expect(screen.getByText("SHOP")).toBeInTheDocument();
    });
    it("제품 목록이 정상적으로 표시된다", async () => {
      await renderAppWithProviders();

      waitFor(() => {
        expect(screen.getByText("코카콜라")).toBeInTheDocument();
        expect(screen.getByText("사이다")).toBeInTheDocument();
      });
    });
    it("제품을 로딩할때 로딩 스피너가 표시된다", async () => {
      await renderAppWithProviders();

      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });
  });
});
