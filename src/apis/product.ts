import fetcher from "@/apis/fetcher";
import { END_POINT } from "@/config/endPoint";
import SERVER_URL from "@/config/serverUrl";
import { ERROR_MESSAGES } from "@/constants/messages";
import { SIZE_FIRST_PAGE, SIZE_PER_PAGE } from "@/constants/page";
import { SORT } from "@/constants/selectOption";
import { CATEGORY } from "@/constants/selectOption";
import { GetProductsProps } from "@/pages/productListPage/productList";

export const getProducts = async ({ queryKeys, pageParam }: { queryKeys: GetProductsProps; pageParam: number }) => {
  const { category, sort } = queryKeys;
  const convertedCategory = CATEGORY[category];
  const convertedSort = SORT[sort];

  const size = pageParam === 0 ? SIZE_FIRST_PAGE : SIZE_PER_PAGE;

  const params = {
    page: String(pageParam),
    size: size.toString(),
  };

  const searchParams = new URLSearchParams(params);
  searchParams.append("sort", `price,id,${convertedSort}`);

  if (category !== "전체") {
    searchParams.append("category", convertedCategory);
  }

  const response = await fetcher.get({
    url: SERVER_URL.apiUrl + END_POINT.products + "?" + searchParams.toString(),
    errorMessage: ERROR_MESSAGES.failGetProducts,
  });

  const data = await response.json();
  return data;
};
