import { PRODUCTS_ENDPOINT, token } from "./config";

export async function fetchProducts(page: number, limit: number) {
  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?page=${page}&limit=${limit}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data;
}
