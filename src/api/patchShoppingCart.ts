export default async function patchShoppingCart(
  productId: number,
  quantity: number
) {
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/cart-items/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    throw new Error(
      `장바구니 정보를 업데이트하는데 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  const data = await response.json();

  return data;
}
