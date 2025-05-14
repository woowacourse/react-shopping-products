import { httpClient } from "../httpClient";

export const removeCartItem = async (id: number) => {
  await httpClient.delete(`/cart-items/${id}`);
};
