import {
  API_ERROR_MESSAGES,
  API_URL_ERROR_MESSAGE,
} from "./constants/errorMessages";
import { ResponseProduct } from "./types";

interface ProductListProps {
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
}

async function getProductList({
  category,
  sort,
  page = 0,
  size = 20,
}: ProductListProps): Promise<ResponseProduct[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";

  if (!API_URL) {
    throw new Error(API_URL_ERROR_MESSAGE);
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (sort) params.append("sort", sort);
  params.append("page", page.toString());
  params.append("size", size.toString());

  const response = await fetch(
    `${API_URL}/products?${params.toString()}`,
    options
  );

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }

  const data = await response.json();
  return data.content;
}

export default getProductList;
