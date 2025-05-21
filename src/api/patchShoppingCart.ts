export default async function patchShoppingCart(
  productId: number,
  quantity: number
) {
  const token = import.meta.env.VITE_APP_TOKEN;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const response = await fetch(`${baseUrl}/cart-items/${productId}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Basic ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productId,
      quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('에러 발생');
  }
}
