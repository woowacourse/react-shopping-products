import { UpdateCartItemQuantity } from "@/apis/cartItems/cartItem.type";
import { ApiRequestHandler } from "../handler.type";
import { cartItemsMockData } from "./cartItemsMockData";
import { HttpResponse } from "msw";

export async function updateCartItemQuantityHandler({
  request,
  params,
}: ApiRequestHandler) {
  const { quantity } = (await request.json()) as UpdateCartItemQuantity;
  const cartItemId = params.id;
  const cartItemIndex = cartItemsMockData.content.findIndex(
    ({ id }) => id === Number(cartItemId)
  );
  const productQuantity =
    cartItemsMockData.content[cartItemIndex].product.quantity;
  if (productQuantity < quantity) {
    return HttpResponse.json(
      {
        errorCode: "OUT_OF_STOCK",
        message: "재고 수량을 초과하여 담을 수 없습니다.",
      },
      { status: 409 }
    );
  }

  cartItemsMockData.content[cartItemIndex].quantity = quantity;
  return HttpResponse.json(
    {
      message: "장바구니 상품 수량을 변경했습니다.",
    },
    { status: 200 }
  );
}
