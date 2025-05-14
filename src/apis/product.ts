import {
  CategoryOptionsKey,
  SortOptionsKey,
  sortOptionsMap,
} from "../constants";
import { createApiUrl, SHOP_API } from "./configs";

export const ProductAPI = {
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
    const response = await fetch(apiUrl);

    return await response.json();
  },
};
