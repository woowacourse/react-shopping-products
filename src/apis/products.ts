import { CategoryOptionsKey, SortOptionsKey } from "../constants";
import { createApiUrl, fetchWithErrorHandling, SHOP_API } from "./configs";
import { PaginationParams } from "./types/pagination";
import { Products } from "./types/products";

export const ProductsAPI = {
  get: async (
    category: CategoryOptionsKey,
    selectedSortOption: SortOptionsKey
  ) => {
    const params: PaginationParams & Record<string, string | number> = {
      page: 0,
      size: 20,
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
