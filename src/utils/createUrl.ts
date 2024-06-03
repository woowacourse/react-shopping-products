import { CategoryQueryString, SortOptionQueryString } from "../constants/products";

interface CreateUrlProps {
  endpoint: string;
  page?: number;
  size?: number;
  category?: CategoryQueryString;
  sortOption?: SortOptionQueryString;
}

export default function createUrl({ endpoint, page, size, category, sortOption }: CreateUrlProps) {
  const searchParams = new URLSearchParams();

  if (page) searchParams.set("page", page.toString());
  if (size) searchParams.set("size", size.toString());
  if (category && category !== "all") searchParams.set("category", category);
  if (sortOption) searchParams.set("sort", `price,${sortOption}`);

  const queryString = searchParams.toString();

  return queryString.length === 0 ? endpoint : `${endpoint}?${queryString}`;
}
