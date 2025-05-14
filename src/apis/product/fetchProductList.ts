import { ProductCategory } from "../../types/ProductCategory";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

type fetchProductListParams = {
  method: HttpMethod;
  params?: {
    category?: ProductCategory;
    page: string;
    size: string;
  };
};

const BASE_URL =
  "http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/products";

const defaultParams: NonNullable<fetchProductListParams["params"]> = {
  page: "0",
  size: "20",
};

const fetchProductList = async ({
  method,
  params = defaultParams,
}: fetchProductListParams) => {
  const url = new URL(BASE_URL);

  if (params.category !== "전체") {
    defaultParams.category = params.category;
  }

  url.search = new URLSearchParams().toString();

  const options = {
    method,
    headers: {
      accept: "application/json",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("에러 발생!");
  }

  const data = await response.json();

  return data;
};

export default fetchProductList;
