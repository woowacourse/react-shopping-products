import { END_POINT } from "@/config/endPoint";
import { ERROR_MESSAGES } from "@/constants/messages";
import { ResponseProduct } from "@/types/products";

export const getProducts = async (): Promise<ResponseProduct> => {
  const response = await fetch(END_POINT.products);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failGetProducts);
  }

  const data = await response.json();
  return data;
};
