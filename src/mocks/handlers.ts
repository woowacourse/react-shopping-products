import { http, HttpResponse } from "msw";

let cartItems = [
  {
    id: 100,
    quantity: 10,
    product: {
      id: 1,
      name: "에어포스",
      category: "패션잡화",
      price: 100000,
      imageUrl: "string",
      quantity: 12,
    },
  },
];

const products = [
  {
    id: 1,
    name: "에어포스",
    category: "패션잡화",
    price: 100000,
    imageUrl: "string",
    quantity: 12,
  },
  {
    id: 2,
    name: "후드티",
    category: "패션잡화",
    price: 5000000000,
    imageUrl: "string",
    quantity: 0,
  },
  {
    id: 3,
    name: "바나나",
    category: "식료품",
    price: 20000,
    imageUrl: "string",
    quantity: 5,
  },
];

export const handlers = [
  // 상품 목록 조회
  http.get(`${import.meta.env.VITE_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;

    const category = params.get("category");
    const sort = params.get("sort");
    const page = parseInt(params.get("page") || "0");
    const size = parseInt(params.get("size") || "20");

    let filteredProducts = [...products];
    if (category && category !== "전체") {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    if (sort === "price,asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sort === "price,desc") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    const start = page * size;
    const end = start + size;
    const data = filteredProducts.slice(start, end);

    return HttpResponse.json({
      content: data,
    });
  }),

  // 장바구니 목록 조회
  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const params = url.searchParams;

    const page = parseInt(params.get("page") || "0");
    const size = parseInt(params.get("size") || "20");

    const start = page * size;
    const end = start + size;
    const data = cartItems.slice(start, end);

    return HttpResponse.json({
      content: data,
    });
  }),

  // 장바구니 상품 추가/수량 변경
  http.post(
    `${import.meta.env.VITE_BASE_URL}/cart-items`,
    async ({ request }) => {
      const { productId, quantity } = (await request.json()) as {
        productId: string;
        quantity: number;
      };

      const numericProductId = Number(productId);

      const selectedCartItem = cartItems.find(
        (item) => item.product.id === numericProductId
      );
      const selectedProduct = products.find(
        (product) => product.id === numericProductId
      );

      if (!selectedProduct) {
        return HttpResponse.json(
          { message: "존재하지 않는 상품입니다." },
          { status: 404 }
        );
      }

      if (quantity > selectedProduct.quantity) {
        return HttpResponse.json(
          { message: "상품의 현재 수량을 초과할 수 없습니다." },
          { status: 400 }
        );
      }

      if (quantity <= 0) {
        cartItems = cartItems.filter(
          (item) => item.product.id !== numericProductId
        );
        return HttpResponse.json({ message: "상품 제거" });
      }

      if (selectedCartItem) {
        selectedCartItem.quantity = quantity;
        return HttpResponse.json(
          { message: "수량 변경 완료" },
          { status: 200 }
        );
      }

      const newCartItem = {
        id: cartItems.length + 1,
        quantity: quantity,
        product: { ...selectedProduct },
      };

      cartItems.push(newCartItem);
      return HttpResponse.json(
        { message: "장바구니에 상품이 추가되었습니다." },
        { status: 200 }
      );
    }
  ),

  // 장바구니 상품 삭제
  http.delete(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:productId`,
    ({ params }) => {
      const { productId } = params;
      cartItems = cartItems.filter((item) => String(item.id) !== productId);

      return HttpResponse.json({ message: "상품 제거" });
    }
  ),
];
