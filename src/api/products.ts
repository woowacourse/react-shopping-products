import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";

export type ProductResponse = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

type GetProductsResponse = {
  content: ProductResponse[];
  totalPages: number;
};

export const getProducts = async ({
  page = 0,
  size = 20,
}: {
  page?: number;
  size?: number;
}): Promise<GetProductsResponse> => {
  return apiRequest<GetProductsResponse>(END_POINT.PRODUCT, {
    queryParams: {
      page,
      size,
    },
  });
};
