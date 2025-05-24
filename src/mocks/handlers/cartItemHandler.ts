import { http, HttpResponse } from "msw";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;

import { cartItems } from "../data/mockCartItem";
import { allProductsData } from "../data/mockProducts";
import { ALL_CATEGORY, CATEGORIES } from "../../constants/filterOptions";

let cartItemId = 9999;
const categories = CATEGORIES.filter((category) => category !== ALL_CATEGORY);

// 장바구니 목록 조회 GET
const getCartItems = http.get(BASE_URL, ({ request }) => {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const size = url.searchParams.get("size");

  const response = {
    content: cartItems,
    pageable: {
      pageNumber: Number.parseInt(page || "0", 10),
      pageSize: Number.parseInt(size || "20", 10),
      sort: { empty: true, sorted: true, unsorted: true },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 0,
    size: 20,
    numberOfElements: 0,
    first: true,
    empty: true,
  };

  return HttpResponse.json(response);
});

// 장바구니에 아이템 추가 POST
const addCartItem = http.post(BASE_URL, async ({ request }) => {
  const newProduct = await request.json();

  if (
    newProduct &&
    typeof newProduct === "object" &&
    "productId" in newProduct &&
    "quantity" in newProduct
  ) {
    const { productId, quantity } = newProduct;
    const newProductId = Number.parseInt(productId, 10);
    const newQuantity = Number.parseInt(quantity, 10);

    const existingCartItem = cartItems.find(
      (item) => item.product.id === newProductId
    );

    if (existingCartItem) {
      return HttpResponse.json(
        { error: "cartItem already exists" },
        { status: 400 }
      );
    }

    const targetProduct = allProductsData.find((product) => {
      return product.id === newProductId;
    });

    if (!targetProduct) {
      return HttpResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (newQuantity > targetProduct.quantity) {
      return HttpResponse.json(
        {
          error: "out of stock",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    const currentCartItemId = cartItemId++;

    const newCartItem = {
      id: currentCartItemId,
      quantity: newQuantity,
      product: {
        id: newProductId,
        name: currentCartItemId.toString(),
        price: Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000,
        imageUrl: "",
        category: categories[Math.floor(Math.random() * categories.length)],
        quantity: 10,
      },
    };
    cartItems.push(newCartItem);

    return HttpResponse.json(undefined, { status: 201 });
  }
});
// 장바구니 아이템 삭제 DELETE

// 장바구니 아이템 수량 변경 PATCH

const cartItemHandler = [getCartItems, addCartItem];

export default cartItemHandler;
