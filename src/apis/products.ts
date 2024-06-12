import { fetchClient } from "../apis";
import { ERROR_MESSAGE, PRODUCTS_SIZE } from "../constants";
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
  try {
    const { content, pageable, first, last }: ProductsResponse = await fetchClient({
      url,
      method: "GET",
    });

    return {
      content,
      nextPageNumber: getProductsNextPageNumber({ pageable, first, last }),
    };
  } catch {
    throw new Error(ERROR_MESSAGE.PRODUCTS.FETCHING_FAILED);
  }
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
