import { getProducts } from "../../../apis";
import { CategoryQueryString, ENDPOINT, SortOptionQueryString } from "../../../constants";
import { createFetchProductsParams, createFetchUrl } from "../../../utils";

interface FetchProductsProps {
  page: number;
  category: CategoryQueryString;
  sortOption: SortOptionQueryString;
}

export default async function fetchProducts({ page, category, sortOption }: FetchProductsProps) {
  const params = createFetchProductsParams({ page, category, sortOption });
  const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.PRODUCT, params });
  return await getProducts(fetchUrl.href);
}
