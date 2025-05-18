import { http, HttpResponse } from "msw";
import { URLS } from "../constants/url";

// Mock data
export const products = [
  {
    id: 1,
    name: "상품 1",
    price: 10000,
    imageUrl: "https://example.com/image1.jpg",
    category: "전자제품",
  },
  {
    id: 2,
    name: "상품 2",
    price: 20000,
    imageUrl: "https://example.com/image2.jpg",
    category: "의류",
  },
  {
    id: 3,
    name: "상품 3",
    price: 15000,
    imageUrl: "https://example.com/image3.jpg",
    category: "전자제품",
  },
];

export const cartItems = [
  {
    id: 1,
    quantity: 2,
    product: products[0],
  },
];

// 타입 정의 개선
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
  return {
    content: items,
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
    numberOfElements: items.length,
    first: page === 0,
    last: page === Math.ceil(items.length / size) - 1,
    empty: items.length === 0,
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

export const handlers = [
  // Products 핸들러
  http.get(URLS.PRODUCTS, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get("sort") || "";

    const sortedProducts = [...products];

    if (sort === "price,asc") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price,desc") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    return HttpResponse.json(paginatedResponse(sortedProducts));
  }),

  // Cart Items 핸들러
  http.get(URLS.CART_ITEMS, () => {
    return HttpResponse.json(paginatedResponse(cartItems));
  }),

  // Cart Item 추가 핸들러
  http.post(URLS.CART_ITEMS, async ({ request }) => {
    const body = (await request.json()) as CartItemRequest;
    const productId = body.productId;
    const quantity = body.quantity || 1;

    const product = products.find((p) => p.id === productId);
    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    const existingCartItem = cartItems.find(
      (item) => item.product.id === productId
    );
    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      const newCartItem = {
        id: cartItems.length + 1,
        quantity,
        product,
      };
      cartItems.push(newCartItem);
    }

    return new HttpResponse(null, { status: 201 });
  }),

  // Cart Item 수정 핸들러
  http.patch(`${URLS.CART_ITEMS}/:id`, async ({ params, request }) => {
    const id = Number(params.id);
    const body = (await request.json()) as CartItemUpdateRequest;
    const quantity = body.quantity;

    const cartItem = cartItems.find((item) => item.id === id);
    if (!cartItem) {
      return new HttpResponse(null, { status: 404 });
    }

    cartItem.quantity = quantity;

    return new HttpResponse(null, { status: 204 });
  }),

  // Cart Item 삭제 핸들러
  http.delete(`${URLS.CART_ITEMS}/:id`, ({ params }) => {
    const id = Number(params.id);
    const index = cartItems.findIndex((item) => item.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    cartItems.splice(index, 1);

    return new HttpResponse(null, { status: 204 });
  }),
];
