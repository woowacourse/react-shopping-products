import { act } from "react";
import { waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";

import useToasts from "../hooks/useToasts";
import useFetchProducts from "../hooks/products/useFetchProducts";

import { vi } from "vitest";
import { server } from "../mocks/server";

import { testQueryClient } from "./utils/testQueryClient";
import renderTestHook from "./utils/renderTestHook";

import { PRODUCTS_SIZE } from "../constants/products";
import { ENDPOINT, PRODUCTS_ERROR_MESSAGES } from "../constants/apis";

import { ProductsUnfilteredInitial, ProductsUnfilteredLast } from "../mocks/data/index";

vi.mock("/src/hooks/useToasts.ts", () => {
  const toastsMock = {
    addToast: vi.fn(),
    removeToast: vi.fn(),
  };

  return {
    default: () => toastsMock,
  };
});

describe("useFetchProducts", () => {
  describe("상품 목록 데이터 페칭", () => {
    beforeEach(() => {
      testQueryClient.clear();
    });

    it("초기 20개의 상품 목록을 불러온다.", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it(`다음 페이지의 상품 목록 데이터를 ${PRODUCTS_SIZE.perRequest}개만큼 불러온다.`, async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest,
        );
      });
    });

    it.skip("상품 목록 조회 중 에러가 발생하면, 토스트 메시지를 보여준다.", async () => {
      server.use(
        http.get(ENDPOINT.PRODUCT, () => {
          return new HttpResponse(null, { status: 500 });
        }),
      );

      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.products).toEqual([]);
        expect(useToasts().addToast).toHaveBeenCalledWith(
          PRODUCTS_ERROR_MESSAGES.fetchingProducts,
          10,
        );
      });
    });

    it("모든 페이지의 상품 목록을 불러온 경우, 더이상 다음 페이지의 데이터를 요청하지 않는다", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      const TOTAL_PRODUCT_LENGTH =
        ProductsUnfilteredInitial.content.length + ProductsUnfilteredLast.content.length;

      const MAX_PAGE = Math.ceil(
        (TOTAL_PRODUCT_LENGTH - PRODUCTS_SIZE.initial) / PRODUCTS_SIZE.perRequest,
      );

      for (let i = 1; i < MAX_PAGE + 1; i++) {
        await waitFor(() => {
          act(() => {
            result.current.fetchNextPage();
          });
        });

        const expectedLength = PRODUCTS_SIZE.initial + i * PRODUCTS_SIZE.perRequest;

        await waitFor(() => {
          expect(result.current.products).toHaveLength(expectedLength);
        });
      }

      act(async () => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(TOTAL_PRODUCT_LENGTH);
      });
    });
  });

  describe.only("상품 카테고리 필터링", () => {
    beforeEach(() => {
      testQueryClient.clear();
    });

    it("사용자가 '도서' 카테고리를 선택했다면 '도서' 카테고리의 상품들만 노출되어야 한다.", async () => {
      const TEST_CATEGORY = "books";

      const { result } = renderTestHook(() =>
        useFetchProducts({ category: TEST_CATEGORY, sort: "asc" }),
      );

      await waitFor(() => {
        const bookProductsLength = result.current.products.filter(
          (product) => product.category === TEST_CATEGORY,
        ).length;
        expect(result.current.products).toHaveLength(bookProductsLength);
      });
    });

    it(`'도서' 카테고리를 ${PRODUCTS_SIZE.initial}개 만큼 보여준 후, 추가로 ${PRODUCTS_SIZE.perRequest}개만큼 추가로 보여줄 수 있다.`, async () => {
      const TEST_CATEGORY = "books";

      const { result } = renderTestHook(() =>
        useFetchProducts({ category: TEST_CATEGORY, sort: "asc" }),
      );

      await waitFor(() => {
        const bookProductsLength = result.current.products.filter(
          (product) => product.category === TEST_CATEGORY,
        ).length;
        expect(result.current.products).toHaveLength(bookProductsLength);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      await waitFor(() => {
        expect(result.current.products).toHaveLength(
          PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest,
        );

        const bookProductsLength = result.current.products.filter(
          (product) => product.category === TEST_CATEGORY,
        ).length;
        expect(result.current.products).toHaveLength(bookProductsLength);
      });
    });
  });

  describe("상품 가격 정렬", () => {
    beforeEach(() => {
      testQueryClient.clear();
    });

    it("초기에는 가격 기준 오름차순으로 정렬된다.", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);

        const PRODUCTS_PRICE_ARRAY = result.current.products.map((product) => product.price);
        const SORTED_PRODUCT_PRICE_ARRAY = [...PRODUCTS_PRICE_ARRAY].sort((a, b) => a - b);

        expect(PRODUCTS_PRICE_ARRAY).toEqual(SORTED_PRODUCT_PRICE_ARRAY);
      });
    });

    it("가격 기준 오름차순으로 정렬되었을 때, 상품 목록 데이터를 추가 요청하는 경우 추가된 모든 상품 목록의 가격은 기존 상품 목록의 가격과 같거나, 더 비싸야한다.", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "asc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      const lastProductIndex = result.current.products.length - 1;
      const LAST_PRODUCT_PRICE = result.current.products[lastProductIndex].price;

      await waitFor(() => {
        const EXPECTED_TOTAL_PRODUCT_LENGTH = PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest;
        expect(result.current.products).toHaveLength(EXPECTED_TOTAL_PRODUCT_LENGTH);

        const ADDITIONAL_PRODUCTS = result.current.products.slice(
          PRODUCTS_SIZE.initial,
          EXPECTED_TOTAL_PRODUCT_LENGTH,
        );

        expect(ADDITIONAL_PRODUCTS.every((product) => product.price >= LAST_PRODUCT_PRICE));
      });
    });

    it("가격 기준을 내림차순으로 변경하면, 내림차순으로 상품 목록이 다시 정렬된다.", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "desc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);

        const PRODUCTS_PRICE_ARRAY = result.current.products.map((product) => product.price);
        const SORTED_PRODUCT_PRICE_ARRAY = [...PRODUCTS_PRICE_ARRAY].sort((a, b) => b - a);

        expect(PRODUCTS_PRICE_ARRAY).toEqual(SORTED_PRODUCT_PRICE_ARRAY);
      });
    });

    it("가격 기준 내림차순으로 정렬되었을 때, 상품 목록 데이터를 추가 요청하는 경우 추가된 모든 상품 목록의 가격은 기존 상품 목록의 가격과 같거나, 더 싸야한다.", async () => {
      const { result } = renderTestHook(() => useFetchProducts({ category: "all", sort: "desc" }));

      await waitFor(() => {
        expect(result.current.products).toHaveLength(PRODUCTS_SIZE.initial);
      });

      act(() => {
        result.current.fetchNextPage();
      });

      const lastProductIndex = result.current.products.length - 1;
      const LAST_PRODUCT_PRICE = result.current.products[lastProductIndex].price;

      await waitFor(() => {
        const EXPECTED_TOTAL_PRODUCT_LENGTH = PRODUCTS_SIZE.initial + PRODUCTS_SIZE.perRequest;

        expect(result.current.products).toHaveLength(EXPECTED_TOTAL_PRODUCT_LENGTH);

        const ADDITIONAL_PRODUCTS = result.current.products.slice(
          PRODUCTS_SIZE.initial,
          EXPECTED_TOTAL_PRODUCT_LENGTH,
        );

        expect(ADDITIONAL_PRODUCTS.every((product) => product.price <= LAST_PRODUCT_PRICE));
      });
    });
  });
});
