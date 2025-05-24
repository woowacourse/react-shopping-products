import { apiClient } from "../utils/apiUtils";

export async function getCartItems({ sortBy }: { sortBy: string }) {
  const params = new URLSearchParams({
    page: "0",
    size: "50",
    sort: sortBy,
  });

  return apiClient
    .get(`/cart-items?${params.toString()}`)
    .then((res) => res.json());
}

export async function postCartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  return apiClient.post(`/cart-items`, {
    productId,
    quantity,
  });
}

export async function deleteCartItem({ id }: { id: number }) {
  return apiClient.delete(`/cart-items/${id}`);
}

export async function updateCartItem({
  id,
  quantity,
}: {
  id: number;
  quantity: number;
}) {
  return apiClient.put(`/cart-items/${id}`, {
    quantity,
  });
}
