export const addCart = async (id: number, price: number) => {
  const response = await fetch(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items',
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic U2hpbmp1bmdPaDpwYXNzd29yZA==',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId: id, quantity: price }),
    }
  );
  return response;
};
