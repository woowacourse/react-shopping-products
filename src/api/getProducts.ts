type PageableType = {
  page: number;
  size: number;
  sort?: string;
};

const PAGEABLE_DEFAULT = {
  page: 0,
  size: 20,
  sort: "",
};

export default async function getProducts(
  category?: "식료품" | "패션잡화" | string,
  pageable: PageableType = PAGEABLE_DEFAULT
) {
  const { page, size, sort } = pageable;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: sort ?? "",
  });

  if (category) params.append("category", category);
  const response = await fetch(`${baseUrl}/products?${params}`);
  if (!response.ok) {
    throw new Error(`응답 실패: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
