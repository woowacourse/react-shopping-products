import { HttpMethod } from "../../types/HttpMethod";

type fetchAddProductParams = {
  method: HttpMethod;
  params: {
    productId: string;
    quantity: string;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchAddProduct = async ({ method, params }: fetchAddProductParams) => {
  const url = new URL(BASE_URL);

  url.search = new URLSearchParams(params).toString();

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchAddProduct;
