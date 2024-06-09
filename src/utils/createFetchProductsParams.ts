import { PRODUCTS_SIZE } from "../constants";

interface createFetchProductsParamsProps {
  page: number;
  category: string;
  sortOption: string;
}

export default function createFetchProductsParams({
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
