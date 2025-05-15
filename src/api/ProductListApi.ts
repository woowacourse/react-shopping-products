import { API_ERROR_MESSAGES } from "./constants/errorMessages";
import { ResponseProduct } from "./types";

async function getProductList({
  category,
  sort,
}: {
  category: string;
  sort: string;
}): Promise<ResponseProduct[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${API_URL}/products?${category ? `category=${category}&` : ""}${
      sort ? `sort=${sort}&` : ""
    }page=0&size=20`,
    options
  );

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }

  const data = await response.json();
  return data.content;
}

export default getProductList;
