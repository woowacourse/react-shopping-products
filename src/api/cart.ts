const baseUrl =
  'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com';

export const getCartItem = async () => {
  const response = await fetch(
    `${baseUrl}/cart-items?page=0&size=20&sort=desc`,
    {
      method: 'GET',
      headers: {
        Authorization: 'Basic dGhnbWwwNTpwYXNzd29yZA==',
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || '장바구니 조회 중 오류가 발생했습니다.');
  }

  const data = await response.json();
  console.log('data', data);
  return data;
};

export const addCart = async (id: number, price: number) => {
  const response = await fetch(`${baseUrl}/cart-items`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic dGhnbWwwNTpwYXNzd29yZA==',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId: id, quantity: price }),
  });
  return response;
};
