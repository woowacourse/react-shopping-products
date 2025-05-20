import.meta.env.VITE_BASE_URL;

import { ProductCategory } from "../../types/ProductCategory";

import { Sort } from "../../types/Sort";

type fetchProductListParams = {
  params?: {
    category?: ProductCategory;
    sort: Sort;
    page: string;
    size: string;
  };
};

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/products`;

const fetchProductList = async ({
  params = { page: "0", size: "20", sort: "price,asc" },
}: fetchProductListParams) => {
  const url = new URL(BASE_URL);

  const { category, ...rest } = params;

  if (category === "전체") {
    url.search = new URLSearchParams(rest).toString();
  } else {
    url.search = new URLSearchParams(params).toString();
  }

  const options = {
    method: "GET",
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
