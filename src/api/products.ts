import { PRODUCTS_ENDPOINT } from "./endPoint";
import { generateToken } from "./auth";

const USER_ID = import.meta.env.VITE_API_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_API_USER_PASSWORD;

export async function fetchProducts(page: number, size: number) {
  const token = generateToken(USER_ID, USER_PASSWORD);

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?page=${page}&size=${size}`,
    {
      headers: {
        Authentication: token,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  return data;
}
