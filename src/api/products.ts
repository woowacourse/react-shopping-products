import { Product, ProductResponse } from "../types/fetch";
import { ENDPOINTS_PRODUCTS } from "./endpoints";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch(ENDPOINTS_PRODUCTS);

  if (!response.ok) {
    throw new Error("200~299 이외의 응답이 발생하였습니다.");
  }

  const data = (await response.json()) as ProductResponse;
  const content = data.content;
  return content;
};
