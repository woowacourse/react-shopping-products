import { FetchProductListResult } from "../../types/FetchProductListResult";
import { ProductCategory } from "../../types/ProductCategory";
import { Sort } from "../../types/Sort";
import { apiRequest } from "../ApiRequest";
import {
  LOW_PRICE_SORT_KEY,
  ALL_CATEGORY,
} from "../../constants/filterOptions";

type fetchProductListParams = {
  params?: {
    category?: ProductCategory;
    sort: Sort;
    page: string;
    size: string;
  };
};

const fetchProductList = async ({
  params = { page: "0", size: "20", sort: LOW_PRICE_SORT_KEY },
}: fetchProductListParams) => {
  const { category, ...rest } = params;

  const data = await apiRequest.GET<FetchProductListResult>({
    endpoint: "/products",
    searchParams: category === ALL_CATEGORY ? rest : params,
  });

  return data;
};

export default fetchProductList;
