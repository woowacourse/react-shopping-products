import { SHOP_API } from "../../../shared/api/config";
import { createApiUrl } from "../../../shared/api/createApiUrl";
import { fetchWithErrorHandling } from "../../../shared/api/errorHandlers";
import {
  CategoryOptionsKey,
  SortOptionsKey,
} from "../../../shared/config/filter";
import { Products } from "../model/types/response";

const sortOptionsMap: Record<SortOptionsKey, string> = {
  "낮은 가격 순": "price,asc",
  "높은 가격 순": "price,desc",
} as const;

export const ProductsAPI = {
  get: async (
    category: CategoryOptionsKey,
    selectedSortOption: SortOptionsKey
  ) => {
    const params: Record<string, string> = {
      page: "0",
      size: "20",
    };

    if (category !== "전체") {
      params.category = category;
    }

    if (selectedSortOption && sortOptionsMap[selectedSortOption]) {
      params.sort = sortOptionsMap[selectedSortOption];
    }

    const apiUrl = createApiUrl(SHOP_API.endpoint.products, params);
    return await fetchWithErrorHandling<Products>(apiUrl);
  },
};
