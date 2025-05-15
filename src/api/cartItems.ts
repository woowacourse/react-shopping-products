import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";

type CartItem = {
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
