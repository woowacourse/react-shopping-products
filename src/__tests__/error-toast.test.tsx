import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { CartContextProvider } from "../contexts/CartContext";
import React from "react";
import { ProductContextProvider } from "../contexts/ProductContext";
import {
  ErrorToastTestWrapper,
  setupProductError,
  setupCartError,
  setupNetworkError,
  setupMultipleErrors,
  resetMocks,
} from "../test-utils/error-toast-test-utils";
import { server } from "../mocks/node";

// Set up and clean up MSW for tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Reset mock flags before each test
beforeEach(() => {
  resetMocks();
});

describe("ErrorToast 컴포넌트 테스트", () => {
  test("제품 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable product fetch error
    setupProductError();

    render(
      <ErrorToastTestWrapper setupMocks={false}>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorToastTestWrapper>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(
        screen.getByText("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
      ).toBeInTheDocument();
    });
  });

  test("장바구니 정보 가져오기 실패시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable cart fetch error
    setupCartError();

    render(
      <ErrorToastTestWrapper setupMocks={false}>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorToastTestWrapper>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(
        screen.getByText("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
      ).toBeInTheDocument();
    });
  });

  test("네트워크 에러 발생시 에러 토스트가 화면에 표시되어야 함", async () => {
    // Enable network error
    setupNetworkError();

    render(
      <ErrorToastTestWrapper setupMocks={false}>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorToastTestWrapper>
    );

    // Check that the error toast appears with the correct message
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
    });
  });

  test("여러 개의 에러가 동시에 발생했을 때 마지막 에러 토스트가 표시되어야 함", async () => {
    // Enable both product and cart errors
    setupMultipleErrors();

    render(
      <ErrorToastTestWrapper setupMocks={false}>
        <CartContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </CartContextProvider>
      </ErrorToastTestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
      ).toBeInTheDocument();
    });
  });
});
