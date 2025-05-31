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

    return HttpResponse.json({ content: data });
  }),

  http.get(`${import.meta.env.VITE_BASE_URL}/cart-items`, ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "0");
    const size = parseInt(url.searchParams.get("size") || "20");

    const start = page * size;
    const end = start + size;
    const data = cartItems.slice(start, end);

    return HttpResponse.json({ content: data });
  }),

  http.post(
    `${import.meta.env.VITE_BASE_URL}/cart-items`,
    async ({ request }) => {
      const body = (await request.json()) as {
        productId: number;
        quantity: number;
      };

      const { productId, quantity } = body;

      const numericProductId = Number(productId);
      const selectedProduct = products.find((p) => p.id === numericProductId);
      const existingCartItem = cartItems.find(
        (item) => item.product.id === numericProductId
      );

      if (!selectedProduct) {
        return HttpResponse.json(
          { message: "존재하지 않는 상품입니다." },
          { status: 404 }
        );
      }

      if (typeof quantity === "number" && quantity > selectedProduct.quantity) {
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

      if (existingCartItem) {
        existingCartItem.quantity = quantity;
        return HttpResponse.json(
          { message: "수량 변경 완료" },
          { status: 200 }
        );
      }

      const newCartItem = {
        id: Math.max(...cartItems.map((item) => item.id), 0) + 1,
        quantity,
        product: { ...selectedProduct },
      };

      cartItems.push(newCartItem);
      return HttpResponse.json(
        { message: "장바구니에 상품이 추가되었습니다." },
        { status: 200 }
      );
    }
  ),

  http.patch(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:cartItemId`,
    async ({ request, params }) => {
      const { cartItemId } = params;
      const quantity = (await request.json()) as number;

      const numericCartItemId = Number(cartItemId);
      const existingCartItem = cartItems.find(
        (item) => item.id === numericCartItemId
      );

      const selectedProduct = existingCartItem?.product;

      if (!existingCartItem || !selectedProduct) {
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
        cartItems = cartItems.filter((item) => item.id !== numericCartItemId);
        return HttpResponse.json({ message: "상품 제거" });
      }

      existingCartItem.quantity = quantity;

      return HttpResponse.json({ message: "수량 변경 완료" }, { status: 200 });
    }
  ),

  http.delete(
    `${import.meta.env.VITE_BASE_URL}/cart-items/:cartItemId`,
    ({ params }) => {
      const { cartItemId } = params;
      cartItems = cartItems.filter((item) => String(item.id) !== cartItemId);

      return HttpResponse.json({ message: "상품 제거" });
    }
  ),
];
