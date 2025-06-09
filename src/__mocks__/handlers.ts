import { delay, http, HttpResponse } from "msw";
import { CategoryOptionsKey } from "../features/product/config/filter";
import { API_BASE_URL } from "../apis/httpClient";
import { CartItem, Product } from "../apis/types/response";
import products from "./data/products.json";

const ENDPOINT = {
  PRODUCTS: "products",
  CART_ITEMS: "cart-items",
};

interface PostCartItemsRequestBody {
  productId: number;
  quantity: number;
}

interface PatchCartItemsRequestBody {
  id: number;
  quantity: number;
}

let cartItems: CartItem[] = [];

export const handlers = [
  /**
   * Products API : GET
   */
  http.get(`${API_BASE_URL}${ENDPOINT.PRODUCTS}`, async ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get("category") as CategoryOptionsKey;
    const sort = url.searchParams.get("sort");

    await delay(100);

    let filteredProducts = [...products] as Product[];
    if (category && category !== "전체") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category
      );
    }

    if (sort) {
      const [sortField, sortOrder] = sort.split(",");
      if (sortField === "price") {
        filteredProducts.sort((a, b) => {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        });
      }
    }

    return HttpResponse.json(filteredProducts);
  }),

  /**
   * CartItems API : GET
   */
  http.get(`${API_BASE_URL}${ENDPOINT.CART_ITEMS}`, async () => {
    return HttpResponse.json(cartItems);
  }),

  /**
   * CartItems API : POST
   */
  http.post(`${API_BASE_URL}${ENDPOINT.CART_ITEMS}`, async ({ request }) => {
    const { productId, quantity = 1 } =
      (await request.json()) as PostCartItemsRequestBody;

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return new HttpResponse(null, {
        status: 404,
        statusText: "Not found",
      });
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id === productId
    );

    let cartItem: CartItem;

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity = quantity;
      cartItem = cartItems[existingItemIndex];
    } else {
      cartItem = {
        id: productId + 100,
        product,
        quantity,
      };
      cartItems.push(cartItem);
    }

    await delay(100);
    return HttpResponse.json(cartItem, { status: 201 });
  }),

  /**
   * CartItems API : DELETE
   */
  http.delete(
    `${API_BASE_URL}${ENDPOINT.CART_ITEMS}/:cartId`,
    async ({ params }) => {
      const { cartId } = params;
      const cartIdNum = Number(cartId);

      const initialLength = cartItems.length;
      cartItems = cartItems.filter((item) => item.id !== cartIdNum);

      if (cartItems.length === initialLength) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not found",
        });
      }

      await delay(100);
      return new HttpResponse(null, { status: 204 });
    }
  ),

  /**
   * CartItems API : PATCH
   */
  http.patch(
    `${API_BASE_URL}${ENDPOINT.CART_ITEMS}/:cartId`,
    async ({ request }) => {
      const { id: cartId, quantity } =
        (await request.json()) as PatchCartItemsRequestBody;

      const itemIndex = cartItems.findIndex(
        (item) => item.id === Number(cartId)
      );

      if (itemIndex === -1) {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Not found",
        });
      }

      cartItems[itemIndex].quantity = quantity;

      await delay(100);
      return HttpResponse.json(cartItems[itemIndex]);
    }
  ),
];
