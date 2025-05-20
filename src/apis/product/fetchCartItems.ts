import { FetchCartItemsResult } from "../../types/FetchCartItemsResult";

type fetchCartItemsParams = {
  params?: {
    page: string;
    size: string;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchCartItems = async ({
  params = { page: "0", size: "50" },
}: fetchCartItemsParams): Promise<FetchCartItemsResult> => {
  const url = new URL(BASE_URL);

  url.search = new URLSearchParams(params).toString();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchCartItems;
