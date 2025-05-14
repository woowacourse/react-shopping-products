import { SortOptionKey, sortOptionMap } from "../constants";

const SHOP_API = {
  baseUrl: `${import.meta.env.VITE_API_BASE_URL}`,
  endpoint: {
    products: "products",
    cartItems: "cart-items",
  },
  defaultParams: {
    page: "0",
    size: "20",
  },
};

const createApiUrl = (endpoint: string, params?: Record<string, string>) => {
  const searchParams = new URLSearchParams({
    ...SHOP_API.defaultParams,
    ...params,
  });
  return `${SHOP_API.baseUrl}${endpoint}?${searchParams.toString()}`;
};

export const ProductAPI = {
  get: async (category: string, selectedSortOption: SortOptionKey) => {
    const params: Record<string, string> = {};

    if (category !== "전체") {
      params.category = category;
    }

    if (selectedSortOption && sortOptionMap[selectedSortOption]) {
      params.sort = sortOptionMap[selectedSortOption];
    }

    const apiUrl = createApiUrl(SHOP_API.endpoint.products, params);
    const response = await fetch(apiUrl);

    return await response.json();
  },
};
