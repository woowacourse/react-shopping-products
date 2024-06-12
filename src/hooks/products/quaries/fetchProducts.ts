import { getProducts } from "../../../apis";
import {
  CategoryQueryString,
  ENDPOINT,
  PRODUCTS_SIZE,
  SortOptionQueryString,
} from "../../../constants";
import { createFetchUrl } from "../../../utils";

interface FetchProductsProps {
  page: number;
  category: CategoryQueryString;
  sortOption: SortOptionQueryString;
}

interface createFetchProductsParamsProps {
  page: number;
  category: string;
  sortOption: string;
}

export default async function fetchProducts({ page, category, sortOption }: FetchProductsProps) {
  const params = createFetchProductsParams({ page, category, sortOption });
  const fetchUrl = createFetchUrl({ endpoint: ENDPOINT.PRODUCT, params });
  return await getProducts(fetchUrl.href);
}

function createFetchProductsParams({
  page,
  category,
  sortOption,
}: createFetchProductsParamsProps): Record<string, string | undefined> {
  const sizeParam = page === 0 ? PRODUCTS_SIZE.initial : PRODUCTS_SIZE.perRequest;
  const categoryParam = category === "all" ? undefined : category;
  const sortParam = `price,${sortOption}`;

  return {
    page: page.toString(),
    size: sizeParam.toString(),
    category: categoryParam,
    sort: sortParam,
  };
}
