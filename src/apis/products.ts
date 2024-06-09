import { fetchClient } from "../apis";
import { PRODUCTS_SIZE } from "../constants";
import { Product } from "../types";

interface ProductsPageInfo {
  pageable: { pageNumber: number };
  first: boolean;
  last: boolean;
}

interface ProductsResponse extends ProductsPageInfo {
  content: Product[];
}

interface ProductRequestResult {
  content: Product[];
  nextPageNumber: number | null;
}

export async function getProducts(url: string): Promise<ProductRequestResult> {
  const { content, pageable, first, last }: ProductsResponse = await fetchClient({
    url,
    method: "GET",
  });

  return {
    content,
    nextPageNumber: getProductsNextPageNumber({ pageable, first, last }),
  };
}

function getProductsNextPageNumber({ pageable, first, last }: ProductsPageInfo) {
  if (last) {
    return null;
  }

  if (first) {
    return pageable.pageNumber + PRODUCTS_SIZE.initial / PRODUCTS_SIZE.perRequest;
  }

  return pageable.pageNumber + 1;
}
