import { URLS } from '../constants/url';

const postCartItem = async (productId: number, quantity: number = 1) => {
  const res = await fetch(URLS.CART_ITEMS, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${import.meta.env.VITE_USER_ID}:${import.meta.env.VITE_PASSWORD}`)}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productId,
      quantity
    })
  });

  if (!res.ok) {
    throw new Error('장바구니에 상품을 추가하는 데 실패했습니다.');
  }

  return res;
};

export default postCartItem;
