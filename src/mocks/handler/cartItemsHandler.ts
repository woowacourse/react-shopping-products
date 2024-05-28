import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { HttpResponse, http } from "msw";
import cartItems from "@/mocks/mockResponse/cart-items.json";

export const cartItemsHandler = [
  http.get(SERVER_URL.apiUrl + END_POINT.cartItems, () => {
    return HttpResponse.json(cartItems, { status: 200 });
  }),
  http.post(SERVER_URL.apiUrl + END_POINT.cartItems, () => {
    return HttpResponse.json(null, { status: 201 });
  }),
  http.delete(SERVER_URL.apiUrl + END_POINT.cartItems + "/:id", () => {
    return HttpResponse.json(null, { status: 201 });
  }),
];
