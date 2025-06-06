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

export default async function getShoppingCart(
  pageable: PageableType = PAGEABLE_DEFAULT
) {
  const { page, size, sort } = pageable;
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
    sort: sort ?? "",
  });

  const response = await fetch(`${baseUrl}/cart-items?${params}`, {
    method: "GET",
    headers: { Authorization: `Basic ${token}` },
  });

  if (!response.ok) {
    throw new Error(
      `장바구니 정보를 가져오는데 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
}
