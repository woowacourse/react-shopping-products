async function patchCartItem({ cartId, quantity }: { cartId: number; quantity: number }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
    body: JSON.stringify({
      quantity: quantity,
    }),
  });

  return await res.json();
}

export default patchCartItem;
