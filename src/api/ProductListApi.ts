import { fetcher } from "./fetcher";
import { ResponseProduct } from "./types";

interface ProductListProps {
  category?: string;
  sort?: string;
  page?: number;
  size?: number;
}

async function getProductList({
  category = "",
  sort = "asc",
  page = 0,
  size = 20,
}: ProductListProps): Promise<ResponseProduct[]> {
  return fetcher<ResponseProduct[]>("/products", {
    params: {
      category,
      sort,
      page,
      size,
    },
  });
}
export default getProductList;

