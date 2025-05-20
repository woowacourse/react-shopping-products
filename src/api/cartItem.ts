export async function getCartItem({ sortBy }: { sortBy: string }) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
  };

  const params = new URLSearchParams({
    page: "0",
    size: "50",
    sort: sortBy,
  });

  return fetch(
    `${import.meta.env.VITE_BASE_URL}/cart-items?${params.toString()}`,
    options
  ).then((res) => res.json());
}

export async function postCartItem({
  productId,
  quantity,
}: {
  productId: number;
  quantity: number;
}) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
    body: JSON.stringify({
      productId,
      quantity,
    }),
  };

  return fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`, options);
}

export async function deleteCartItem({ id }: { id: number }) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
  };

  return fetch(`${import.meta.env.VITE_BASE_URL}/cart-items/${id}`, options);
}
