async function postCartItem({ productId, quantity }: { productId: number; quantity: number }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
    body: JSON.stringify({
      productId: productId,
      quantity: quantity,
    }),
  });

  return res;
}

export default postCartItem;
