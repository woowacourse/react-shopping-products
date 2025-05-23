import { http, HttpResponse } from "msw";
import { cartItems as C0, products as P0 } from "./data";
import { CartItem } from "../types/cartContents";

type PaginatedResponse<T> = {
  content: T[];
  pageable: {
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};

const paginatedResponse = <T>(
  items: T[],
  page = 0,
  size = 10
): PaginatedResponse<T> => {
  const start = page * size;
  const end = start + size;
  const paginatedItems = items.slice(start, end);

  return {
    content: paginatedItems,
    pageable: {
      offset: page * size,
      pageNumber: page,
      pageSize: size,
      paged: true,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      unpaged: false,
    },
    totalElements: items.length,
    totalPages: Math.ceil(items.length / size),
    size: size,
    number: page,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    numberOfElements: paginatedItems.length,
    first: page === 0,
    last:
      items.length === 0 ? true : page === Math.ceil(items.length / size) - 1,
    empty: paginatedItems.length === 0,
  };
};

// 요청 타입 정의
interface CartItemRequest {
  productId: number;
  quantity: number;
}

interface CartItemUpdateRequest {
  quantity: number;
}

// MSW 테스트용 상태 저장소
export const testStateStore = {
  shouldFailProducts: false,
  shouldFailCart: false,
  shouldFailBoth: false,
  customProductsError: null as string | null,
  customCartError: null as string | null,
  reset() {
    this.shouldFailProducts = false;
    this.shouldFailCart = false;
    this.shouldFailBoth = false;
    this.customProductsError = null;
    this.customCartError = null;
  },
};

// 전역 AWS 패턴과 /api 패턴 모두 지원
const API_PATTERNS = {
  PRODUCTS: [
    /\/api\/products(\?.*)?$/,
    /http:\/\/techcourse-lv2-alb-974870821\.ap-northeast-2\.elb\.amazonaws\.com\/products(\?.*)?$/,
  ],
  PRODUCTS_BY_ID: [
    /\/api\/products\/(\d+)$/,
    /http:\/\/techcourse-lv2-alb-974870821\.ap-northeast-2\.elb\.amazonaws\.com\/products\/(\d+)$/,
  ],
  CART_ITEMS: [
    /\/api\/cart-items(\?.*)?$/,
    /http:\/\/techcourse-lv2-alb-974870821\.ap-northeast-2\.elb\.amazonaws\.com\/cart-items(\?.*)?$/,
  ],
  CART_ITEMS_BY_ID: [
    /\/api\/cart-items\/(\d+)$/,
    /http:\/\/techcourse-lv2-alb-974870821\.ap-northeast-2\.elb\.amazonaws\.com\/cart-items\/(\d+)$/,
  ],
  ORDERS: [
    /\/api\/orders$/,
    /http:\/\/techcourse-lv2-alb-974870821\.ap-northeast-2\.elb\.amazonaws\.com\/orders$/,
  ],
};

const products = structuredClone(P0);
const cartItems = structuredClone(C0);

export const handlers = [
  // Products 핸들러
  ...API_PATTERNS.PRODUCTS.map((pattern) =>
    http.get(pattern, ({ request }) => {
      if (testStateStore.shouldFailProducts || testStateStore.shouldFailBoth) {
        const statusText =
          testStateStore.customProductsError || "Product Fetching Error";
        return new HttpResponse(null, {
          status: 500,
          statusText,
        });
      }

      const url = new URL(request.url);
      const sort = url.searchParams.get("sort") || "";
      const category = url.searchParams.get("category") || "";
      const page = parseInt(url.searchParams.get("page") || "0");
      const size = parseInt(url.searchParams.get("size") || "50");

      let filteredProducts = [...products];

      // 카테고리 필터링
      if (category && category !== "전체") {
        filteredProducts = filteredProducts.filter(
          (product) => product.category === category
        );
      }

      // 정렬 적용
      if (sort === "price,asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
      } else if (sort === "price,desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
      }

      return HttpResponse.json(paginatedResponse(filteredProducts, page, size));
    })
  ),

  // 단일 Product 조회
  ...API_PATTERNS.PRODUCTS_BY_ID.map((pattern) =>
    http.get(pattern, ({ request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split("/");
      const idStr = pathParts[pathParts.length - 1];
      const id = Number(idStr);

      const product = products.find((p) => p.id === id);

      if (!product) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json(product);
    })
  ),

  // Cart Items 핸들러
  ...API_PATTERNS.CART_ITEMS.map((pattern) =>
    http.get(pattern, ({ request }) => {
      if (testStateStore.shouldFailCart || testStateStore.shouldFailBoth) {
        const statusText =
          testStateStore.customCartError || "Cart Fetching Error";
        return new HttpResponse(null, {
          status: 500,
          statusText,
        });
      }

      const url = new URL(request.url);
      const page = parseInt(url.searchParams.get("page") || "0");
      const size = parseInt(url.searchParams.get("size") || "10");

      return HttpResponse.json(paginatedResponse(cartItems, page, size));
    })
  ),

  // Cart Item 추가 핸들러
  ...API_PATTERNS.CART_ITEMS.map((pattern) =>
    http.post(pattern, async ({ request }) => {
      const body = (await request.json()) as CartItemRequest;
      const productId = body.productId;
      const quantity = body.quantity || 1;

      const product = products.find((p) => p.id === productId);

      if (!product) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Product Not Found",
        });
      }
      if (product.quantity === 0) {
        return new HttpResponse(null, {
          status: 400,
          statusText: "Sold Out",
        });
      }
      const existingCartItem = cartItems.find(
        (item) => item.product.id === productId
      );
      if (existingCartItem) {
        existingCartItem.quantity += quantity;
      } else {
        const newCartItem = {
          id:
            cartItems.length > 0
              ? Math.max(...cartItems.map((item) => item.id)) + 1
              : 1,
          quantity,
          product,
        };
        cartItems.push(newCartItem);
      }

      return new HttpResponse(null, { status: 201 });
    })
  ),

  // Cart Item 수정 핸들러
  ...API_PATTERNS.CART_ITEMS_BY_ID.map((pattern) =>
    http.patch(pattern, async ({ request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split("/");
      const idStr = pathParts[pathParts.length - 1];
      const id = Number(idStr);

      const body = (await request.json()) as CartItemUpdateRequest;
      const quantity = body.quantity;

      const cartItem = cartItems.find((item) => item.id === id);
      const product = products.find((p) => p.id === cartItem?.product.id);
      if (!cartItem) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Cart Item Not Found",
        });
      }
      if (!product) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Product Not Found",
        });
      }

      if (product.quantity < quantity) {
        return new HttpResponse(null, {
          status: 400,
          statusText: "Insufficient Stock",
        });
      }
      if (quantity <= 0) {
        return new HttpResponse(null, {
          status: 400,
          statusText: "Invalid Quantity",
        });
      }

      cartItem.quantity = quantity;

      return new HttpResponse(null, { status: 204 });
    })
  ),

  // Cart Item 삭제 핸들러
  ...API_PATTERNS.CART_ITEMS_BY_ID.map((pattern) =>
    http.delete(pattern, ({ request }) => {
      const url = new URL(request.url);
      const pathParts = url.pathname.split("/");
      const idStr = pathParts[pathParts.length - 1];
      const id = Number(idStr);

      const index = cartItems.findIndex((item) => item.id === id);

      if (index === -1) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Cart Item Not Found",
        });
      }

      cartItems.splice(index, 1);

      return new HttpResponse(null, { status: 204 });
    })
  ),

  // Orders 핸들러
  ...API_PATTERNS.ORDERS.map((pattern) =>
    http.post(pattern, async ({ request }) => {
      const body = (await request.json()) as CartItem[];
      for (const item of body) {
        const qty = Number(item.quantity);
        const product = products.find((p) => p.id === item.product.id);

        // 1) 상품이 없는 경우
        if (!product) {
          return new HttpResponse(null, {
            status: 404,
            statusText: "Product Not Found",
          });
        }

        // 2) 재고 부족인 경우
        if (product.quantity < qty) {
          return new HttpResponse(null, {
            status: 400,
            statusText: "Insufficient Stock",
          });
        }

        product.quantity -= qty;
      }

      // 4) 장바구니 비우기
      cartItems.length = 0;

      // 5) 성공 응답
      return new HttpResponse(null, { status: 201 });
    })
  ),
];
