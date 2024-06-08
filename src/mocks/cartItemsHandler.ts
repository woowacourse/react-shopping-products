import { HttpResponse, http } from "msw";
import { CART_ITEMS_ENDPOINT } from "../api/endpoints";
import cartItems from "./cartItems.json";

export const cartItemsHandler = [
  http.get(CART_ITEMS_ENDPOINT, () => {
    return HttpResponse.json(cartItems, { status: 200 });
  }),
  http.patch(
    `${CART_ITEMS_ENDPOINT}/:cartItemId`,
    async ({ request, params }) => {
      const userRequest = (await request.json()) as { quantity: number };
      const targetCartItemId = Number(params.cartItemId);

      const targetCartItem = cartItems.content.find(
        (cartItem) => cartItem.id === targetCartItemId
      );
      if (targetCartItem) {
        targetCartItem.quantity = userRequest.quantity;
      }

      return new HttpResponse(null, { status: 200 });
    }
  ),
  http.delete(`${CART_ITEMS_ENDPOINT}/:cartItemId`, ({ params }) => {
    const targetCartItemId = Number(params.cartItemId);

    cartItems.content = cartItems.content.filter(
      (cartItem) => cartItem.id !== targetCartItemId
    );

    return new HttpResponse(null, { status: 204 });
  }),
];
