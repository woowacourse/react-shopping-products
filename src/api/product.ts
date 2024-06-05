import { fetchAPI } from "./fetch";
import { ProductItem } from "@/types";

export const getProducts = async (
  page: number,
  size: number
): Promise<{ totalPages: number; content: ProductItem[] }> => {
  const data = await fetchAPI<{ totalPages: number; content: ProductItem[] }>({
    url: `products?page=${page}&size=${size}`,
    method: "GET",
  });

  return data;
};
