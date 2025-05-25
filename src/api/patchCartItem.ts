type PatchCartItemParams = {
  cartId: number;
  quantity: number;
};

async function patchCartItem({ cartId, quantity }: PatchCartItemParams) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/cart-items/${cartId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${import.meta.env.VITE_TOKEN}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '수량 업데이트 중 오류가 발생했습니다.');
  }

  return response.json();
}

export default patchCartItem;
