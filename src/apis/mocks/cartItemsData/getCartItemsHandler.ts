import { HttpResponse } from "msw";
import { cartItemsMockData } from "./cartItemsMockData";

export const getCartItemsHandler = () => {
  return HttpResponse.json(cartItemsMockData, { status: 200 });
};
