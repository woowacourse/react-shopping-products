import {
  API_ERROR_MESSAGES,
  API_URL_ERROR_MESSAGE,
} from "./constants/errorMessages";
import { ResponseCartItem } from "./types";

interface CarItemListProps {
  page?: number;
  size?: number;
  sort?: string;
}

async function getCartItemList({
  page = 0,
  size = 50,
  sort = "asc",
}: CarItemListProps): Promise<ResponseCartItem[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";

  if (!API_URL) {
    throw new Error(API_URL_ERROR_MESSAGE);
  }

  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };

  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("size", size.toString());
  if (sort) params.append("sort", sort);

  const response = await fetch(
    `${API_URL}/cart-items?${params.toString()}`,
    options
  );

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }

  const data = await response.json();

  return data.content;
}

export default getCartItemList;
