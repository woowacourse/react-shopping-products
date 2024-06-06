import { PAGE } from "../mocks/handlers";
import getErrorMessage from "../utils/errorMessage";
import { PRODUCTS_ENDPOINT } from "./endpoints";

export const fetchProducts = async (fetchParams: fetchParams) => {
  const size = fetchParams.page === PAGE.FIRST_PAGE ? PAGE.DEFAULT_SIZE : PAGE.ADDITIONAL_SIZE;
  const categoryQuery = fetchParams.category === "전체" ? "" : `category=${fetchParams.category}`;

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&page=${fetchParams.page}&size=${size}&sort=${fetchParams.sortOption}`
  );

  if (!response.ok) {
    fetchParams.setErrorMessage(getErrorMessage(response.status));
    throw new Error("상품을 불러오는데 실패했습니다.");
  }

  const data = await response.json();
  return data;
};
