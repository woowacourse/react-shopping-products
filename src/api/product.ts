import { CategoryOption, sortOption } from "../page/ShopPage";
import { getRequestOptions } from "./getRequestOptions";

interface getProductProps {
  category: CategoryOption;
  sortBy: sortOption;
}

export default async function getProduct({
  sortBy,
  category,
}: getProductProps) {
  const options = getRequestOptions({ method: "GET" });

  const params = new URLSearchParams({
    page: "0",
    size: "20",
    sort: sortBy,
  });
  const categoryParams = new URLSearchParams({ category });

  return fetch(
    `${import.meta.env.VITE_BASE_URL}/products?${
      category !== "전체" && `${categoryParams.toString()}&&`
    }${params.toString()}`,
    options
  ).then((res) => res.json());
}
