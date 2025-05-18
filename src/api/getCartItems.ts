import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { CartItem } from "../types/productType";
import { FetchError } from "../types/\bfetchType";

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
  error: FetchError | null;
  data: CartItemsResponse;
}> => {
  const { data, error } = await fetchWithErrorHandling("cart-items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
  });

  return { data, error };
};

export default getCartItems;
