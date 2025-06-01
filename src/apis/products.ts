import { CategoryOptionsKey, SortOptionsKey } from "../constants";
import { createApiUrl, fetchWithErrorHandling, SHOP_API } from "./configs";
import { PaginationParams } from "./types/pagination";
import { Products } from "./types/products";
import { isErrorResponse } from "../utils/typeGuard";

export const ProductsAPI = {
  get: async (
    category: CategoryOptionsKey,
    selectedSortOption: SortOptionsKey
  ): Promise<Products> => {
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
    const response = await fetchWithErrorHandling<Products>(apiUrl);

    if (isErrorResponse(response)) {
      throw new Error(response.error);
    }

    return response as Products;
  },
};
