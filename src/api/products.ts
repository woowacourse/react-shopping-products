import apiRequest from "./utils/apiRequest";
import { END_POINT } from "./constants/endPoint";

export type ProductRequest = {
  page: number;
  size: number;
  sort?: string;
  category?: string;
};

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
  sort,
  category,
}: ProductRequest): Promise<GetProductsResponse> => {
  return apiRequest<GetProductsResponse>(END_POINT.PRODUCT, {
    queryParams: {
      page,
      size,
      sort,
      category,
    },
  });
};

export const getProductById = async (
  productId: number
): Promise<ProductResponse> => {
  try {
    return await apiRequest<ProductResponse>(
      `${END_POINT.PRODUCT}/${productId}`
    );
  } catch (e) {
    console.error("❌ getProductById 실패:", e);
    throw e;
  }
};
