import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";
import { Product } from "../mocks/data/products";

export type CartItem = {
  productId: number;
  id: number;
  quantity: number;
  product: Product;
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

export const postCartItems = async (
  productId: number,
  quantity: number,
): Promise<void> => {
  await apiRequest<void>(END_POINT.CART, {
    method: "POST",
    body: JSON.stringify({
      productId,
      quantity: quantity,
    }),
  });
};

export const deleteCartItem = async (basketId: number): Promise<void> => {
  return await apiRequest<void>(`${END_POINT.CART}/${basketId}`, {
    method: "DELETE",
  });
};
