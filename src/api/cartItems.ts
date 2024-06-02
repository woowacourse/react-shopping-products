import { CartResponse } from "../types/fetch";
import { ENDPOINTS_CART } from "./endpoints";
import { token } from "./token";

export const fetchCartItems = async () => {
  const response = await fetch(`${ENDPOINTS_CART}`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as CartResponse;
  return data;
};
