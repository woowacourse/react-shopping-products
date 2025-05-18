import { CategoryOptionsKey, SortOptionsKey } from "../constants";
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

    if (category !== "전체") {
      params.category = category;
    }

    if (selectedSortOption) {
      params.sort = selectedSortOption;
    }

    const apiUrl = createApiUrl(SHOP_API.endpoint.products, params);
    return await fetchWithErrorHandling<Products>(apiUrl);
  },
};
