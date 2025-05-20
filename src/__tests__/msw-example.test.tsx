import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import App from "../App";
import { CartContextProvider } from "../contexts/CartContext";
import { ErrorContextProvider } from "../contexts/ErrorContext";
import { ProductContextProvider } from "../contexts/ProductContext";

// 전체 앱을 래핑하는 헬퍼 함수
const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <ProductContextProvider>
      <ErrorContextProvider>
        <CartContextProvider>{component}</CartContextProvider>
      </ErrorContextProvider>
    </ProductContextProvider>
  );
};

describe("MSW 예제 테스트", () => {
  // 모든 테스트 전에 서버 시작
  beforeAll(async () => {
    console.log("Starting MSW server...");
    await server.listen({ onUnhandledRequest: "error" });
  });

  // 각 테스트 후에 서버 리셋
  afterEach(async () => {
    console.log("Resetting MSW handlers...");
    await server.resetHandlers();
  });

  // 모든 테스트 후에 서버 종료
  afterAll(async () => {
    console.log("Closing MSW server...");
    await server.close();
  });

  test("상품 목록이 올바르게 로드되고 표시됩니다", async () => {
    renderWithProviders(<App />);

    // 스피너가 사라질 때까지 기다림
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // 상품 목록이 로드될 때까지 기다림
    await waitFor(() => {
      expect(screen.getByText("맛있는 양파")).toBeInTheDocument();
      expect(screen.getByText("편안한 슬리퍼")).toBeInTheDocument();
      expect(screen.getByText("유기농 당근")).toBeInTheDocument();
    });

    // 가격이 표시될 때까지 기다림
    await waitFor(() => {
      expect(screen.getByText("3,000원")).toBeInTheDocument();
      expect(screen.getByText("12,000원")).toBeInTheDocument();
      expect(screen.getByText("4,000원")).toBeInTheDocument();
    });
  });

  test("특정 요청에 대한 모의 응답을 런타임에 재정의할 수 있습니다", async () => {
    server.use(
      http.get(/products(\?.*)?$/, () => {
        console.log("MOCK SPECIAL PRODUCT HANDLER CALLED");
        return HttpResponse.json({
          content: [
            {
              id: 99,
              name: "특별 상품",
              price: 9999,
              imageUrl: "https://example.com/special.jpg",
              category: "한정판",
              quantity: 100,
            },
          ],
          pageable: {
            offset: 0,
            pageNumber: 0,
            pageSize: 10,
            paged: true,
            sort: { empty: false, sorted: true, unsorted: false },
            unpaged: false,
          },
          totalElements: 1,
          totalPages: 1,
          size: 10,
          number: 0,
          sort: { empty: false, sorted: true, unsorted: false },
          numberOfElements: 1,
          first: true,
          last: true,
          empty: false,
        });
      })
    );

    renderWithProviders(<App />);

    // 스피너가 사라질 때까지 기다림
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // 특별 상품이 표시될 때까지 기다림
    await waitFor(
      () => {
        expect(screen.getByText("특별 상품")).toBeInTheDocument();
        expect(screen.getByText("9,999원")).toBeInTheDocument();
      },
      { timeout: 5000 }
    );

    // 기존 상품들이 없어졌는지 확인
    await waitFor(() => {
      expect(screen.queryByText("맛있는 양파")).not.toBeInTheDocument();
      expect(screen.queryByText("편안한 슬리퍼")).not.toBeInTheDocument();
    });
  });

  test("에러 응답을 모의할 수 있습니다", async () => {
    server.use(
      http.get(/products(\?.*)?$/, () => {
        console.log("MOCK ERROR HANDLER CALLED");
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<App />);

    // 스피너가 사라질 때까지 기다림
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
    });

    // 에러 메시지가 표시될 때까지 기다림
    await waitFor(
      () => {
        expect(
          screen.getByText(
            "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
          )
        ).toBeInTheDocument();
      },
      { timeout: 5000 }
    );
  });
});
