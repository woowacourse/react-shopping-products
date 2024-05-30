import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { ERROR_MESSAGES } from "@/constants/messages";
import { ResponseProduct } from "@/types/products";
import { Category, SORT, Sort } from "@/constants/selectOption";
import { CATEGORY } from "@/constants/selectOption";
interface getProductsProps {
  category: Category;
  page: number;
  size: number;
  sort: Sort;
}

export const getProducts = async ({ category, page, size, sort }: getProductsProps): Promise<ResponseProduct> => {
  const convertedCategory = CATEGORY[category];
  const convertedSort = SORT[sort];

  const params = {
    page: page.toString(),
    size: size.toString(),
  };

  const searchParams = new URLSearchParams(params);
  searchParams.append("sort", `price,id,${convertedSort}`);

  if (category !== "전체") {
    searchParams.append("category", convertedCategory);
  }

  const response = await fetch(SERVER_URL.apiUrl + END_POINT.products + "?" + searchParams.toString());

  if (!response.ok) {
    throw new Error(ERROR_MESSAGES.failGetProducts);
  }

  const data = await response.json();
  return data;
};
