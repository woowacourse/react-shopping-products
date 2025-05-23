import { waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { server } from "../mocks/node";
import { testStateStore } from "../mocks/handlers";
import { renderAppWithProviders } from "../test-utils/renderWithProviders";

// 에러의 경우에는 따로 mock 처리를 하여 재 렌더링 방지.
// 글로벌 단에서 mock을 하는 것 외에는 재랜더링 방지가
// 안되는것 같더군요.
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  testStateStore.reset();
});
afterAll(() => server.close());

describe("ErrorToast 컴포넌트 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    testStateStore.shouldFailProducts = true;

    renderAppWithProviders();

    await waitFor(() => {
      expect(
        screen.getByText("제품 정보를 가져오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    testStateStore.shouldFailCart = true;

    renderAppWithProviders();

    await waitFor(() => {
      expect(
        screen.getByText("장바구니 정보를 가져오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("네트워크 에러 발생시 에러 토스트가 화면에 표시되어야 함", async () => {
    testStateStore.shouldFailBoth = true;

    renderAppWithProviders();
    //장바구니가 후출되므로, 이것이 표시되게 됨.
    await waitFor(() => {
      expect(
        screen.getByText("장바구니 정보를 가져오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("여러 개의 에러가 동시에 발생했을 때 마지막 에러 토스트가 표시되어야 함", async () => {
    testStateStore.shouldFailProducts = true;
    testStateStore.shouldFailCart = true;

    renderAppWithProviders();
    // 이것도 동일.
    await waitFor(() => {
      expect(
        screen.getByText("장바구니 정보를 가져오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });
});
