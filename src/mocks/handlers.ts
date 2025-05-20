import { http, HttpResponse } from "msw";
import { cartItems, products } from "./data";

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
    last: page === Math.ceil(items.length / size) - 1,
    empty: paginatedItems.length === 0,
  };
};

// 요청 타입 정의
interface CartItemRequest {
  productId: number;
  quantity?: number;
}

interface CartItemUpdateRequest {
  quantity: number;
}

// 정확한 URL을 위한 정규식 패턴 (상대 경로 및 절대 경로 모두 지원)
const API_PATTERN = new RegExp(
  "(/api.*|http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/.*)$"
);

export const handlers = [
  // Products 핸들러
  http.get(/\/products(\?.*)?$/, ({ request }) => {
    console.log("MSW INTERCEPTED PRODUCTS REQUEST:", request.url);
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
  }),

  // 단일 Product 조회
  http.get(/\/products\/(\d+)$/, ({ request }) => {
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const idStr = pathParts[pathParts.length - 1];
    const id = Number(idStr);

    const product = products.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),

  // Cart Items 핸들러
  http.get(/\/cart-items(\?.*)?$/, ({ request }) => {
    console.log("MSW INTERCEPTED CART_ITEMS REQUEST:", request.url);
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");
    const size = parseInt(url.searchParams.get("size") || "10");

    return HttpResponse.json(paginatedResponse(cartItems, page, size));
  }),

  // Cart Item 추가 핸들러
  http.post(/\/cart-items$/, async ({ request }) => {
    console.log("MSW INTERCEPTED CART_ITEMS POST:", request.url);
    const body = (await request.json()) as CartItemRequest;
    const productId = body.productId;
    const quantity = body.quantity || 1;

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "상품을 찾을 수 없습니다.",
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
  }),

  // Cart Item 수정 핸들러
  http.patch(/\/cart-items\/(\d+)$/, async ({ request }) => {
    console.log("MSW INTERCEPTED CART_ITEMS PATCH:", request.url);
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const idStr = pathParts[pathParts.length - 1];
    const id = Number(idStr);

    const body = (await request.json()) as CartItemUpdateRequest;
    const quantity = body.quantity;

    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "장바구니 아이템을 찾을 수 없습니다.",
      });
    }

    if (quantity <= 0) {
      return new HttpResponse(null, {
        status: 400,
        statusText: "수량은 1 이상이어야 합니다.",
      });
    }

    cartItem.quantity = quantity;

    return new HttpResponse(null, { status: 204 });
  }),

  // Cart Item 삭제 핸들러
  http.delete(/\/cart-items\/(\d+)$/, ({ request }) => {
    console.log("MSW INTERCEPTED CART_ITEMS DELETE:", request.url);
    const url = new URL(request.url);
    const pathParts = url.pathname.split("/");
    const idStr = pathParts[pathParts.length - 1];
    const id = Number(idStr);

    const index = cartItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "장바구니 아이템을 찾을 수 없습니다.",
      });
    }

    cartItems.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),

  // 모든 API 요청을 로깅하기 위한 포괄적인 핸들러
  http.all(API_PATTERN, ({ request }) => {
    console.log("MSW UNHANDLED REQUEST:", request.method, request.url);
    // 처리되지 않은 요청은 계속 진행
    return HttpResponse.json(
      {
        message: "이 요청은 MSW에 의해 가로채지만 처리되지 않았습니다.",
        url: request.url,
        method: request.method,
      },
      { status: 500 }
    );
  }),
];
