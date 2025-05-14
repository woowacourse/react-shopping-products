import { AddCartItems } from "@/types/cartItem";
import { httpClient } from "../httpClient";

export const addCartItems = async ({ productId, quantity }: AddCartItems) => {
  const url = new URLSearchParams({
    page: "0",
    size: "50",
    sort: "asc",
  });

  await httpClient.post(`/cart-items?${url.toString()}`, {
    productId,
    quantity,
  });
};
