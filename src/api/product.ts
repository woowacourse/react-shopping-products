import { fetchAPI } from "./fetch";
import { ProductItem } from "@/types";

export const getProducts = async (
  page: number,
  size: number
): Promise<ProductItem[]> => {
  const data = await fetchAPI<{ content: ProductItem[] }>({
    url: `products?page=${page}&size=${size}`,
    method: "GET",
  });

  return data.content;
};
