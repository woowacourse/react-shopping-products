import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { server } from "../mocks/node";
import { URLS } from "../constants/url";
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
  test("상품 목록이 올바르게 로드되고 표시됩니다", async () => {
    renderWithProviders(<App />);

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.getByText("맛있는 양파")).toBeInTheDocument();
      expect(screen.getByText("편안한 슬리퍼")).toBeInTheDocument();
      expect(screen.getByText("유기농 당근")).toBeInTheDocument();
    });

    expect(screen.getByText("3,000원")).toBeInTheDocument();
    expect(screen.getByText("12,000원")).toBeInTheDocument();
    expect(screen.getByText("4,000원")).toBeInTheDocument();
  });

  test("특정 요청에 대한 모의 응답을 런타임에 재정의할 수 있습니다", async () => {
    server.use(
      http.get(URLS.PRODUCTS, () => {
        return HttpResponse.json({
          content: [
            {
              id: 99,
              name: "특별 상품",
              price: 9999,
              imageUrl: "https://example.com/special.jpg",
              category: "한정판",
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

    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(screen.getByText("특별 상품")).toBeInTheDocument();
      expect(screen.getByText("9,999원")).toBeInTheDocument();

      expect(screen.queryByText("맛있는 양파")).not.toBeInTheDocument();
      expect(screen.queryByText("편안한 슬리퍼")).not.toBeInTheDocument();
    });
  });

  test("에러 응답을 모의할 수 있습니다", async () => {
    // 에러 응답 모의
    server.use(
      http.get(URLS.PRODUCTS, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<App />);

    // 에러 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
      expect(
        screen.getByText(
          "네트워크 오류가 발생했습니다. 잠시후 다시 이용해 주세요."
        )
      ).toBeInTheDocument();
    });
  });
});
