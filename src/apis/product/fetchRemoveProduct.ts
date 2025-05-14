import { HttpMethod } from "../../types/HttpMethod";

type fetchRemoveProductParams = {
  method: HttpMethod;
  params: {
    productId: number;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/cart-items`;
const TOKEN = import.meta.env.VITE_TOKEN;

const fetchRemoveProduct = async ({
  method,
  params,
}: fetchRemoveProductParams) => {
  const url = new URL(`${BASE_URL}/${params.productId}`);

  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Basic ${TOKEN}`,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }
};

export default fetchRemoveProduct;
