import { HttpMethod } from "../../types/HttpMethod";

type fetchAddProductParams = {
  method: HttpMethod;
  params: {
    productId: string;
    quantity: number;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchAddProduct = async ({ method, params }: fetchAddProductParams) => {
  const url = new URL(BASE_URL);

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
    body: JSON.stringify(params),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("상품을 추가할 수 없습니다.");
  }
};

export default fetchAddProduct;
