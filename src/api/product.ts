import { fetchAPI } from "./fetch";
import { Category, ProductItem, Sort } from "@/types";

export const getProducts = async (
  page: number,
  size: number,
  category: Category,
  sort: Sort = "price,id,asc"
): Promise<{
  totalPages: number;
  content: ProductItem[];
  last: boolean;
} | void> => {
  const data = await fetchAPI<{
    totalPages: number;
    content: ProductItem[];
    last: boolean;
  }>({
    url: `products?page=${page}&size=${size}&sort=${sort}${
      category === "all" ? "" : `&category=${category}`
    }`,
    method: "GET",
  });

  if (data) {
    return data;
  }
};
