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

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message ||
        `장바구니에 상품을 추가하는 중 오류가 발생했습니다 (${res.status} ${res.statusText})`,
    );
  }

  return res;
}

export default postCartItem;
