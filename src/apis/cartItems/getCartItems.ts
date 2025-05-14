import { CartItemType } from "@/types/cartItem";
import { httpClient } from "../httpClient";

export const getCartItems = async (): Promise<CartItemType[]> => {
  const url = new URLSearchParams({
    page: "0",
    size: "50",
    sort: "asc",
  });

  const response = await httpClient.get(`/cart-items?${url.toString()}`);
  if (!response.ok) {
    throw new Error("징바구니를 가져오는 데 실패했습니다.");
  }

  const data = await response.json();
  return data.content;
};
