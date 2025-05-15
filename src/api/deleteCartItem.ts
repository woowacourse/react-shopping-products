async function deleteCartItem({ cartId }: { cartId: number }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  });

  return res;
}

export default deleteCartItem;
