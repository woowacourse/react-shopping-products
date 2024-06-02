import { API_URL } from "../constants/url";
import { SmartURLSearchParams } from "./SmartURLSearchParams";
import { cartClient } from "./cartClient";

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

const PAGE_SIZE = 4;
const INITIAL_PAGE_SIZE = 20;

// 첫 로드 시 불러온 20개를 건너뛰기 위해 페이지 1부터는 조정값 4를 더해줌
const PAGE_ADJUSTMENT = 4;
export interface ProductResponse {
  content: Product[];
}

export const getProducts = async (queryParams?: SmartURLSearchParams): Promise<Product[]> => {
  // TODO: 아래의 변환 과정을 깔끔하게 리팩토링하기
  if (queryParams) {
    const page = Number(queryParams.get("page"));

    const isInitialPage = page === 0;
    if (isInitialPage) {
      queryParams?.set("size", INITIAL_PAGE_SIZE);
    } else {
      queryParams.set("page", page + PAGE_ADJUSTMENT);
      queryParams?.set("size", PAGE_SIZE);
    }
  }

  if (queryParams?.get("category") === "all") {
    queryParams.delete("category");
  }

  const data = await cartClient.get<ProductResponse>(API_URL.products, queryParams);

  return data.content;
};
