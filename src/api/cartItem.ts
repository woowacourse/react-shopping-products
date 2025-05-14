interface PostCartItemProps {
  productId: number;
  quantity: number;
}

export async function postCartItem({ productId, quantity }: PostCartItemProps) {
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

  return fetch(`${import.meta.env.VITE_BASE_URL}/cart-items`, options).then(
    (res) => res.json()
  );
}

export async function deleteCartItem({ id }: { id: number }) {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Basic ${import.meta.env.VITE_USER_TOKEN}==`,
    },
  };

  return fetch(
    `${import.meta.env.VITE_BASE_URL}/cart-items/${id}`,
    options
  ).then((res) => res.json());
}
