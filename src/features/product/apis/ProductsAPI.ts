import { createApiUrl, getData } from "../../../apis/apiClient";
import { SHOP_API } from "../../../apis/config";
import { Products } from "../../../apis/types/response";
import { CategoryOptionsKey, SortOptionsKey } from "../config/filter";

const URL = SHOP_API.endpoint.products;

const sortOptionsMap: Record<SortOptionsKey, string> = {
  "낮은 가격 순": "price,asc",
  "높은 가격 순": "price,desc",
} as const;

export const ProductsAPI = {
  get: async (category: CategoryOptionsKey, sortOption: SortOptionsKey) => {
    const params: Record<string, string> = { page: "0", size: "20" };

    if (category !== "전체") params.category = category;
    if (sortOption && sortOptionsMap[sortOption]) {
      params.sort = sortOptionsMap[sortOption];
    }

    return getData<Products>(createApiUrl(URL, params));
  },
};
