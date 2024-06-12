import { generateBasicToken, handleResponse } from "../utils";
import { CART_ITEMS_ENDPOINT } from "./endpoints";

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const token = generateBasicToken({ userId: USER_ID, userPassword: USER_PASSWORD });

// 사용자의 장바구니에 아이템 추가
interface addCartItemProps {
  productId: number;
  quantity: number;
}

export async function addCartItem({ productId, quantity }: addCartItemProps): Promise<Response> {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  return handleResponse(response, "장바구니 항목 추가에 실패했습니다.");
}

// 장바구니 아이템 삭제
interface deleteCartItemProp {
  cartItemId: number;
}

export async function deleteCartItem({ cartItemId }: deleteCartItemProp): Promise<Response> {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  return handleResponse(response, "장바구니 항목 삭제에 실패했습니다.");
}

// 사용자의 장바구니 목록 조회
export async function getCartItems(): Promise<CartItemProps[]> {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });

  await handleResponse(response, "장바구니 항목 목록 조회에 실패했습니다.");
  const data = await response.json();
  return data.content;
}

// 장바구니 아이템 수량 변경
interface QuantityProps {
  cartItemId: number;
  quantity: number;
}

export async function patchCartItemQuantityChange({
  cartItemId,
  quantity,
}: QuantityProps): Promise<Response> {
  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  return handleResponse(response, "장바구니 항목 수량 변경에 실패했습니다.");
}
