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
    const data = await response.json();
    throw new Error(data.error);
  }

  const data = await response.json();

  return data;
}
