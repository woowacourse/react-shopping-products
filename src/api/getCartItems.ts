import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { CartItem } from "../types/productType";

export type CartItemsResponse = {
  content: CartItem[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  number: number;
  numberOfElements: number;
  size: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  first: boolean;
  empty: boolean;
};

const getCartItems = async (): Promise<{
  newErrorMessage: string;
  data: CartItemsResponse;
}> => {
  const { data, newErrorMessage } = await fetchWithErrorHandling("cart-items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
  });
  return { newErrorMessage, data };
};

export default getCartItems;
