import { CategoryOption, sortOption } from "../constants";
import { apiClient } from "./apiUtils";

interface getProductProps {
  category: CategoryOption;
  sortBy: sortOption;
}

export default async function getProducts({
  sortBy,
  category,
}: getProductProps) {
  const params = new URLSearchParams({
    page: "0",
    size: "20",
    sort: sortBy,
  });
  const categoryParams = new URLSearchParams({ category });

  return apiClient
    .get(
      `/products?${
        category !== "전체" && `${categoryParams.toString()}&&`
      }${params.toString()}`
    )
    .then((res) => res.json());
}
