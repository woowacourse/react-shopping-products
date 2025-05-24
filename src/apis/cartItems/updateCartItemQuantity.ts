import { httpClient } from "../httpClient";
import { UpdateCartItemQuantity } from "./cartItem.type";

const ERROR_MESSAGE = "장바구니 상품 수량 변경 중 오류가 발생했습니다.";

export const updateCartItemQuantity = async ({
  id,
  quantity,
}: UpdateCartItemQuantity) => {
  const response = await httpClient.patch(`/cart-items/${id}`, { quantity });

  if (!response.ok) {
    throw new Error(ERROR_MESSAGE);
  }
};
