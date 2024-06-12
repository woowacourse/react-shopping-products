import { fetchGet } from "./fetch";
import { Category, ProductItem, Sort } from "@/types";

export const getProducts = async (
  page: number,
  size: number,
  category: Category,
  sort: Sort = "price,id,asc"
): Promise<{
  totalPages: number;
  content: ProductItem[];
  last?: boolean;
}> => {
  const data = await fetchGet(
    `products?page=${page}&size=${size}&sort=${sort}${
      category === "all" ? "" : `&category=${category}`
    }`
  );

  return data;
};
