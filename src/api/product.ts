import { fetchAPI } from "./fetch";
import { Category, ProductItem, Sort } from "@/types";

export const getProducts = async (
  page: number,
  size: number,
  category: Category | null,
  sort: Sort = "price,id,asc"
): Promise<{ totalPages: number; content: ProductItem[]; last: boolean }> => {
  const data = await fetchAPI<{
    totalPages: number;
    content: ProductItem[];
    last: boolean;
  }>({
    url: `products?page=${page}&size=${size}&sort=${sort}${
      category ? `&category=${category}` : ""
    }`,
    method: "GET",
  });

  return data;
};
