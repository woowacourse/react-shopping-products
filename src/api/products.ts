import { generateBasicToken, handleResponse } from "../utils";
import { PRODUCTS_ENDPOINT } from "./endpoints";

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const token = generateBasicToken({ userId: USER_ID, userPassword: USER_PASSWORD });

// 상품 목록 조회
interface getProductsProps {
  page: number;
  size: number;
  sort: string[];
  category: string;
}

export async function getProducts({
  page = 0,
  size = 20,
  sort = [],
  category = "전체",
}: getProductsProps): Promise<ProductProps[]> {
  const sortParams = sort.join(",");
  const categoryQuery = category === "전체" ? "" : `category=${category}`;

  const response = await fetch(
    `${PRODUCTS_ENDPOINT}?${categoryQuery}&page=${page}&size=${size}&sort=${sortParams}`,
    {
      method: "GET",
      headers: {
        Authorization: token,
      },
    }
  );

  await handleResponse(response, "상품 목록 조회에 실패했습니다.");
  const data = await response.json();
  return data.content;
}
