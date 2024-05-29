import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { ERROR_MESSAGES } from "@/constants/messages";
import { ResponseProduct } from "@/types/products";

export const getProducts = async (): Promise<ResponseProduct> => {
  const response = await fetch(SERVER_URL.apiUrl + END_POINT.products);

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failGetProducts);
  }

  const data = await response.json();
  return data;
};
