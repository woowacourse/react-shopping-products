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
      quantity: "50",
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
    quantity: "50",
  },
  {
    id: 2,
    name: "후드티",
    category: "패션잡화",
    price: 50000,
    imageUrl: "string",
    quantity: "1",
  },
  {
    id: 3,
    name: "바나나",
    category: "식료품",
    price: 20000,
    imageUrl: "string",
    quantity: "5",
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

    let filteredProducts = products;
    if (category && category !== "전체") {
      filteredProducts = products.filter((p) => p.category === category);
    }

    if (sort === "price,asc") {
      filteredProducts.sort((a, b) => a.price - b.price);
    }

    if (sort === "price,desc") {
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

  // 장바구니에 상품 수량 조절
  http.post(
    `${import.meta.env.VITE_BASE_URL}/cart-items`,
    async ({ request }) => {
      const { productId, quantity } = (await request.json()) as {
        productId: string;
        quantity: string;
      };

      const selectedCartItem = cartItems.find(
        (item) => item.product.id === Number(productId)
      );

      if (Number(quantity) <= 0) {
        cartItems = cartItems.filter(
          (item) => String(item.product.id) !== productId
        );
        return HttpResponse.json({ message: "상품 제거" });
      }

      // 장바구니에 이미 있는 상품인 경우
      if (selectedCartItem) {
        selectedCartItem.quantity = Number(quantity);
        return HttpResponse.json(
          { message: "장바구니에 상품이 추가되었습니다." },
          { status: 200 }
        );
      }

      // 장바구니에 없는 상품인 경우
      const selectedProduct = products.find(
        (product) => product.id.toString() === productId
      );
      if (!selectedProduct) {
        return HttpResponse.json(
          { message: "존재하지 않는 상품입니다." },
          { status: 404 }
        );
      }
      const newCardItems = {
        id: cartItems.length + 1,
        quantity: Number(quantity),
        product: { ...selectedProduct, quantity: "1" },
      };

      cartItems.push(newCardItems);

      return HttpResponse.json(
        { message: "장바구니에 상품이 추가되었습니다." },
        { status: 200 }
      );
    }
  ),

  // 장바구니에 상품 삭제
  http.delete(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:productId`,
    ({ params }) => {
      const { productId } = params;

      cartItems = cartItems.filter((item) => String(item.id) !== productId);

      return HttpResponse.json({ message: "상품 제거" });
    }
  ),
];
