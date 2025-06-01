import { http, HttpResponse } from "msw";
import productsData from "./dummy.json";
import { SHOP_API } from "../configs";
import { BaseProduct } from "../types/products";

interface CartItem {
  id: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
  quantity: number;
}

let cartItems: CartItem[] = [];
let nextCartId = 1;

const cartItemsUrl = `${SHOP_API.baseUrl}/cart-items`;
const productsUrl = `${SHOP_API.baseUrl}/products`;

const getProducts = ({ request }: any) => {
  const url = new URL(request.url);
  const category = url.searchParams.get("category");
  const sort = url.searchParams.get("sort");

  let filteredProducts: BaseProduct[] = productsData as BaseProduct[];

  if (category) {
    filteredProducts = filteredProducts.filter(
      (item) => item.category === category
    );
  }

  if (sort) {
    const [, sortOrderType] = sort.split(",");
    filteredProducts = filteredProducts.sort((a, b) => {
      const priceDelta = a.price - b.price;
      return sortOrderType === "desc" ? -priceDelta : priceDelta;
    });
  }

  const totalElements = filteredProducts.length;
  const totalPages = Math.ceil(filteredProducts.length / 20);

  return HttpResponse.json({
    content: filteredProducts,
    pageable: {
      pageNumber: 0,
      pageSize: 20,
      sort: {
        empty: false,
        sorted: true,
        unsorted: false,
      },
      offset: 0,
      paged: true,
      unpaged: false,
    },
    last: totalElements <= 20,
    totalElements,
    totalPages,
    size: 20,
    number: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    first: true,
    numberOfElements: productsData.slice(0, 20).length,
    empty: productsData.length === 0,
  });
};

const getCartItems = ({ request }: any) => {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "0");
  const size = parseInt(url.searchParams.get("size") || "50");

  const startIndex = page * size;
  const endIndex = startIndex + size;
  const paginatedItems = cartItems.slice(startIndex, endIndex);

  return HttpResponse.json({
    content: paginatedItems,
    pageable: {
      pageNumber: page,
      pageSize: size,
      sort: {
        empty: true,
        sorted: false,
        unsorted: true,
      },
      offset: startIndex,
      paged: true,
      unpaged: false,
    },
    last: endIndex >= cartItems.length,
    totalElements: cartItems.length,
    totalPages: Math.ceil(cartItems.length / size),
    size: size,
    number: page,
    sort: { empty: true, sorted: false, unsorted: true },
    first: page === 0,
    numberOfElements: paginatedItems.length,
    empty: cartItems.length === 0,
  });
};

const addCartItem = async ({ request }: any) => {
  const body = (await request.json()) as {
    productId: number;
    quantity: number;
  };
  const { productId, quantity = 1 } = body;
  const existingItem = cartItems.find((item) => item.product.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    const product = (productsData as BaseProduct[]).find(
      (p) => p.id === productId
    );
    if (product) {
      cartItems.push({
        id: nextCartId++,
        product: product,
        quantity,
      });
    }
  }

  return new HttpResponse(null, { status: 201 });
};

const updateCartItem = async ({ request, params }: any) => {
  const cartId = parseInt(params.cartId as string);
  const body = (await request.json()) as { quantity: number };
  const { quantity } = body;

  const itemIndex = cartItems.findIndex((item) => item.id === cartId);

  if (itemIndex === -1) {
    return new HttpResponse(null, { status: 404 });
  }

  if (quantity <= 0) {
    cartItems.splice(itemIndex, 1);
  } else {
    cartItems[itemIndex].quantity = quantity;
  }

  return new HttpResponse(null, { status: 200 });
};

const deleteCartItem = ({ params }: any) => {
  const cartId = parseInt(params.cartId as string);
  const itemIndex = cartItems.findIndex((item) => item.id === cartId);

  if (itemIndex === -1) {
    return new HttpResponse(null, { status: 404 });
  }

  cartItems.splice(itemIndex, 1);
  return new HttpResponse(null, { status: 204 });
};

export const handlers = [
  http.get(productsUrl, getProducts),
  http.get(cartItemsUrl, getCartItems),
  http.post(cartItemsUrl, addCartItem),
  http.patch(`${cartItemsUrl}/:cartId`, updateCartItem),
  http.delete(`${cartItemsUrl}/:cartId`, deleteCartItem),
];
