import { CategoryOption, sortOption } from "../constants";
import { getRequestOptions, tryFetch } from "./apiUtils";

interface getProductProps {
  category: CategoryOption;
  sortBy: sortOption;
}

export default async function getProducts({
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

  return tryFetch({
    fetchFunction: () =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}/products?${
          category !== "전체" && `${categoryParams.toString()}&&`
        }${params.toString()}`,
        options
      ),
  }).then((res) => res.json());
}
