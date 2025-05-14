const productBaseUrl = `${import.meta.env.VITE_API_BASE_URL}products`;

export const ProductAPI = {
  get: async (category: string) => {
    const categoryQueryParam =
      category !== "전체" ? `?category=${category}` : "";

    const response = await fetch(`${productBaseUrl}${categoryQueryParam}`);

    return await response.json();
  },
};
