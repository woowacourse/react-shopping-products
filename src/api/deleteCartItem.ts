async function deleteCartItem({ cartId }: { cartId: number }) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(
      `장바구니에서 상품을 삭제하는 중 오류가 발생했습니다 (${res.status} ${res.statusText})`,
    );
  }

  return res;
}

export default deleteCartItem;
