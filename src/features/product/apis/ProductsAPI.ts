import { httpClient } from "../../../apis/httpClient";
import { Product } from "../../../apis/types/response";
import { CategoryOptionsKey, SortOptionsKey } from "../config/filter";

const ERROR_MESSAGE = "상품 데이터를 가져오는 데 실패했습니다.";

const sortOptionsMap: Record<SortOptionsKey, string> = {
  "낮은 가격 순": "price,asc",
  "높은 가격 순": "price,desc",
} as const;

export const ProductsAPI = {
  get: async (
    category: CategoryOptionsKey,
    sortOption: SortOptionsKey
  ): Promise<Product[]> => {
    const params: Record<string, string> = { page: "0", size: "20" };

    if (category !== "전체") params.category = category;
    if (sortOption && sortOptionsMap[sortOption]) {
      params.sort = sortOptionsMap[sortOption];
    }

    const response = await httpClient.get(
      `products?${new URLSearchParams(params).toString()}`
    );
    if (!response.ok) throw new Error(ERROR_MESSAGE);

    return await response.json();
  },
};
