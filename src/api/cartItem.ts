interface PostCartItemProps {
  productId: number;
  quantity: number;
}

export default async function postCartItem({
  productId,
  quantity,
}: PostCartItemProps) {
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
