import { PRODUCTS_ENDPOINT } from "./endPoint";
import { fetchWithToken } from "./fetchWithToken";

export async function getProducts(page: number, size: number) {
  const data = await fetchWithToken({
    url: `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`,
    errorMessage: "Failed to fetch products",
  });

  return data;
}
