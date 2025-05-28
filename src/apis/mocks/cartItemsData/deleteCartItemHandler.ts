import { HttpResponse } from "msw";
import { cartItemsMockData } from "./cartItemsMockData";
import { ApiRequestHandler } from "../handler.type";

export const deleteCartItemHandler = ({ params }: ApiRequestHandler) => {
  const cartItemId = params.id;
  const cartItemIndex = cartItemsMockData.content.findIndex(
    ({ id }) => id === Number(cartItemId)
  );

  cartItemsMockData.content.splice(cartItemIndex, 1);
  return HttpResponse.json(null, { status: 204 });
};
