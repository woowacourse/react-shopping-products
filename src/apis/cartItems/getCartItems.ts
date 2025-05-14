import { CartItemType } from "@/types/cartItem";
import { httpClient } from "../httpClient";

export const getCartItems = async (): Promise<CartItemType[]> => {
  const url = new URLSearchParams({
    page: "0",
    size: "50",
    sort: "asc",
  });

  const data = await httpClient.get(`/cart-items?${url.toString()}`);
  return data.content;
};
