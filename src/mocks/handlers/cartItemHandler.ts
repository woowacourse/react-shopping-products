import { http, HttpResponse } from "msw";

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;

import { cartItems } from "../data/mockCartItem";
import { allProductsData } from "../data/mockProducts";

let cartItemId = 9999;

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
        ...targetProduct,
      },
    };
    cartItems.push(newCartItem);

    return HttpResponse.json(undefined, { status: 201 });
  }
});

const deleteCartItem = http.delete(`${BASE_URL}/:id`, ({ params }) => {
  const { id } = params;
  const cartItemId = Array.isArray(id) ? id[0] : id;
  const convertedCartItemId = Number.parseInt(cartItemId, 10);
  const itemIndex = cartItems.findIndex(
    (item) => item.id === convertedCartItemId
  );

  if (itemIndex === -1) {
    return HttpResponse.json(
      { error: `cartItem not found; cartItemId=${convertedCartItemId}` },
      { status: 404 }
    );
  }
  cartItems.splice(itemIndex, 1);

  return HttpResponse.json(undefined, { status: 204 });
});

const updateCartItemQuantity = http.patch(
  `${BASE_URL}/:id`,
  async ({ params, request }) => {
    const { id } = params;
    const cartItemId = Array.isArray(id) ? id[0] : id;
    const convertedCartItemId = Number.parseInt(cartItemId, 10);
    const itemIndex = cartItems.findIndex(
      (item) => item.id === convertedCartItemId
    );

    if (itemIndex === -1) {
      return HttpResponse.json(
        { error: `cartItem not found; cartItemId=${convertedCartItemId}` },
        { status: 404 }
      );
    }

    const updatedData = await request.json();
    if (
      !updatedData ||
      typeof updatedData !== "object" ||
      !("quantity" in updatedData)
    ) {
      return HttpResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { quantity } = updatedData;
    const newQuantity = Number.parseInt(quantity, 10);

    if (typeof quantity !== "number" || quantity < 0) {
      return HttpResponse.json({ error: "Invalid quantity" }, { status: 400 });
    }

    if (newQuantity > cartItems[itemIndex].product.quantity) {
      return HttpResponse.json(
        {
          error: "out of stock",
          message: "재고 수량을 초과하여 담을 수 없습니다.",
        },
        { status: 400 }
      );
    }

    cartItems[itemIndex].quantity = newQuantity;
    if (newQuantity === 0) {
      cartItems.splice(itemIndex, 1);
    }

    return HttpResponse.json(undefined, { status: 200 });
  }
);

const cartItemHandler = [
  getCartItems,
  addCartItem,
  deleteCartItem,
  updateCartItemQuantity,
];

export default cartItemHandler;
