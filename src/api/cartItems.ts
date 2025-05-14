import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";

type GetCartItemsCountsResponse = {
  quantity: number;
};

export const getCartItemsCounts =
  async (): Promise<GetCartItemsCountsResponse> => {
    return apiRequest<GetCartItemsCountsResponse>(END_POINT.CART_COUNT, {});
  };
