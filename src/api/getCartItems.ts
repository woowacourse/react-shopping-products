import fetchWithErrorHandling from "./fetchWithErrorHandling";
import { CartItem } from "../App";

type CartItemsResponse = {
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
  let newErrorMessage = "";

  const { data, status } = await fetchWithErrorHandling("cart-items", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_BASIC_AUTHORIZATION}`,
    },
  });

  if (status === 400) {
    newErrorMessage = " 장바구니를 불러오지 못했습니다. 다시 시도해주세요";
  } else if (status === 404) {
    newErrorMessage = "not found";
  } else if (status === 500) {
    newErrorMessage = "서버에 문제가 발생했습니다.";
  }

  return { newErrorMessage, data };
};

export default getCartItems;
