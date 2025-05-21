export default async function postShoppingCart(
  productId: number,
  quantity: number
) {
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/cart-items`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message ||
        `상품을 장바구니에 추가하는데 실패했습니다 (${response.status})`
    );
  }
}
