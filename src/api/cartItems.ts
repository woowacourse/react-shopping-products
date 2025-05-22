import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";

export type CartItem = {
  id: number;
  quantity: number;
  product: {
    id: number;
  };
};

type GetCartItemsResponse = {
  content: CartItem[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
};

export const getCartItems = async (): Promise<CartItem[]> => {
  const response = await apiRequest<GetCartItemsResponse>(END_POINT.CART, {
    queryParams: {
      page: 0,
      size: 50,
    },
  });

  return response.content;
};

export const postCartItems = async (productId: number): Promise<void> => {
  await apiRequest<void>(END_POINT.CART, {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity: 1,
    }),
  });
};

export const deleteCartItem = async (basketId: number): Promise<void> => {
  return await apiRequest<void>(`${END_POINT.CART}/${basketId}`, {
    method: "DELETE",
  });
};
