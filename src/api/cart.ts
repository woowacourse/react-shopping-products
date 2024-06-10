import { generateBasicToken } from "../utils/auth";
import { CART_ITEMS_ENDPOINT } from "./endpoints";

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;

// 사용자의 장바구니에 아이템 추가
export async function addCartItem(productId: number, quantity: number): Promise<Response> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);

  const response = await fetch(`${CART_ITEMS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    throw new Error("장바구니 항목 추가에 실패했습니다.");
  }

  return response;
}

// 장바구니 아이템 삭제
export async function deleteCartItem(cartItemId: number): Promise<Response> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "DELETE",
    headers: {
      Authorization: token,
    },
  });

  if (!response.ok) {
    throw new Error("장바구니 항목 삭제에 실패했습니다.");
  }

  return response;
}

// 사용자의 장바구니 목록 조회
export async function getCartItems(
  page: number = 0,
  size: number = 20,
  sort: string[] = []
): Promise<CartItemProps[]> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const sortParams = sort.join(",");
  const response = await fetch(
    `${CART_ITEMS_ENDPOINT}?page=${page}&size=${size}&sort=${sortParams}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("장바구니 항목 목록 조회에 실패했습니다.");
  }

  const data = await response.json();
  return data.content;
}

// 장바구니 아이템 수량 변경
export async function patchCartItemQuantityChange(
  cartItemId: number,
  quantity: number
): Promise<Response> {
  const token = generateBasicToken(USER_ID, USER_PASSWORD);
  const response = await fetch(`${CART_ITEMS_ENDPOINT}/${cartItemId}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error("장바구니 항목 수량 변경에 실패했습니다.");
  }

  return response;
}
