import { API_ERROR_MESSAGES } from "./constants/errorMessages";
import { ResponseCartItem } from "./types";

interface CarItemListProps {
  page: number;
  size: number;
  sort: string;
}

async function getCartItemList({
  page,
  size,
  sort,
}: CarItemListProps): Promise<ResponseCartItem[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}`,
    },
  };
  const response = await fetch(
    `${API_URL}/cart-items?page=${page}&size=${size}&sort=${sort}`,
    options
  );

  if (!response.ok) {
    throw new Error(API_ERROR_MESSAGES[response.status]);
  }

  const data = await response.json();

  return data.content;
}

export default getCartItemList;
