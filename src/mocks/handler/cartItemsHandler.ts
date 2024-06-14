import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { HttpResponse, http } from "msw";
import cartItems from "@/mocks/mockResponse/cart-items.json";

export const cartItemsHandler = [
  http.get(SERVER_URL.apiUrl + END_POINT.cartItems, () => {
    return HttpResponse.json(cartItems, { status: 200 });
  }),
  http.post(SERVER_URL.apiUrl + END_POINT.cartItems, async ({ request }) => {
    const res = (await request.json()) as { productId: number; quantity: number };

    const tmpCartItem = {
      id: Math.random() * 10000,
      quantity: 1,
      product: {
        id: res.productId,
        name: "테스트 아이템",
        price: 999,
        imageUrl: "mockImg",
        category: "fashion",
      },
    };

    if (cartItems) cartItems.content.push(tmpCartItem);

    return HttpResponse.json(null, { status: 201 });
  }),
  http.delete(SERVER_URL.apiUrl + END_POINT.cartItems + "/:id", ({ params }) => {
    const requestCartId = Number(params.id);

    if (cartItems) cartItems.content = cartItems.content.filter((cartItem) => cartItem.id !== requestCartId);

    return HttpResponse.json(null, { status: 201 });
  }),
  http.patch(SERVER_URL.apiUrl + END_POINT.cartItems + "/:id", async ({ request, params }) => {
    const userRequest = (await request.json()) as { quantity: number };
    const requestCartId = Number(params.id);

    const findedCartItem = cartItems.content.find((cartItem) => cartItem.id === requestCartId);
    if (findedCartItem) findedCartItem.quantity = userRequest.quantity;

    return HttpResponse.json(null, { status: 200 });
  }),
];
