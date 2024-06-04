import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { ERROR_MESSAGES } from "@/constants/messages";
import { SORT } from "@/constants/selectOption";
import { CATEGORY } from "@/constants/selectOption";
import { GetProductsProps } from "@/pages/productListPage";

// type GetProductsQueryProps = [string, GetProductsProps];

// export const getProductsQuery = async ({ pageP }): Promise<ResponseProduct> => {
//   const [, queryParams] = queryKey;
//   const { category, page, size, sort } = queryParams;
//   const convertedCategory = CATEGORY[category];
//   const convertedSort = SORT[sort];

//   const params = {
//     page: page.toString(),
//     size: size.toString(),
//   };

//   const searchParams = new URLSearchParams(params);
//   searchParams.append("sort", `price,id,${convertedSort}`);

//   if (category !== "전체") {
//     searchParams.append("category", convertedCategory);
//   }

//   const response = await fetch(SERVER_URL.apiUrl + END_POINT.products + "?" + searchParams.toString());

//   if (!response.ok) {
//     throw new Error(ERROR_MESSAGES.failGetProducts);
//   }

//   const data = await response.json();
//   return data;
// };

export const getProducts = async ({ queryKeys, pageParam }: { queryKeys: GetProductsProps; pageParam: number }) => {
  const { category, sort } = queryKeys;
  const convertedCategory = CATEGORY[category];
  const convertedSort = SORT[sort];

  const size = pageParam === 0 ? 20 : 4;
  const params = {
    page: String(pageParam),
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
