import {
  CategoryOptionsKey,
  SortOptionsKey,
  sortOptionsMap,
} from "../constants";
import { Products } from "../types/products";
import { createApiUrl, fetchWithErrorHandling, SHOP_API } from "./configs";

export const ProductsAPI = {
  get: async (
    category: CategoryOptionsKey,
    selectedSortOption: SortOptionsKey
  ) => {
    const params: Record<string, string> = {
      page: "0",
      size: "20",
    };

    const options: RequestInit = {
      method: "GET",
    };

    if (category !== "전체") {
      params.category = category;
    }

    if (selectedSortOption && sortOptionsMap[selectedSortOption]) {
      params.sort = sortOptionsMap[selectedSortOption];
    }

    const apiUrl = createApiUrl(SHOP_API.endpoint.products, params);
    return await fetchWithErrorHandling<Products>(apiUrl, options);
  },
};
