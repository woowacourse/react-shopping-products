import { getRequestOptions, tryFetch } from "./apiUtils";

export async function getCartItems({ sortBy }: { sortBy: string }) {
  const options = getRequestOptions({ method: "GET", withAuth: true });

  const params = new URLSearchParams({
    page: "0",
    size: "50",
    sort: sortBy,
  });

  return tryFetch({
    fetchFunction: () =>
      fetch(
        `${import.meta.env.VITE_BASE_URL}/cart-items?${params.toString()}`,
        options
      ),
  }).then((res) => res.json());
}

export async function postCartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const options = getRequestOptions({
    method: "POST",
    body: {
      productId,
      quantity,
    },
    withAuth: true,
  });

  return tryFetch({
    fetchFunction: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`, options),
  });
}

export async function deleteCartItem({ id }: { id: number }) {
  const options = getRequestOptions({
    method: "DELETE",
    withAuth: true,
  });

  return tryFetch({
    fetchFunction: () =>
      fetch(`${import.meta.env.VITE_BASE_URL}/cart-items/${id}`, options),
  });
}
