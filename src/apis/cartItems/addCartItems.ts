import { AddCartItems } from "@/apis/cartItems/cartItem.type";
import { httpClient } from "../httpClient";

const ERROR_MESSAGE = "장바구니에 상품을 추가하던 중 에러가 발생했습니다.";

export const addCartItems = async ({ productId, quantity }: AddCartItems) => {
  const response = await httpClient.post("/cart-items", {
    productId,
    quantity,
  });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
};
