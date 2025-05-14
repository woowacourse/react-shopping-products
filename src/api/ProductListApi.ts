import { ResponseProduct } from "./types";

async function getProductList(): Promise<ResponseProduct[]> {
  const API_URL = import.meta.env.VITE_BASE_URL || "";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${API_URL}/products?page=0&size=20&sort=price%2Casc`,
    options
  );

  const data = await response.json();
  return data.content;
}

export default getProductList;
