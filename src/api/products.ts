import { PAGE } from "../mocks/handlers";
import getErrorMessage from "../utils/errorMessage";
import { API_ENDPOINTS } from "./endpoints";

export const fetchProducts = async (fetchParams: FetchParams) => {
  const size = fetchParams.page === PAGE.FIRST_PAGE ? PAGE.DEFAULT_SIZE : PAGE.ADDITIONAL_SIZE;
  const categoryQuery = fetchParams.category === "전체" ? "" : `category=${fetchParams.category}`;

  const response = await fetch(
    `${API_ENDPOINTS.PRODUCTS}?${categoryQuery}&page=${fetchParams.page}&size=${size}&sort=${fetchParams.sortOption}`
  );

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status));
  }

  const data = await response.json();

  return {
    content: data.content,
    page: data.number,
    isLast: data.last,
  };
};
