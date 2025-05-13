const getCartItems = async () => {
  const response = await fetch(
    'http://techcourse-lv2-alb-974870821.ap-northeast-2.elb.amazonaws.com/cart-items',
    {
      method: 'GET',
      headers: { Authorization: 'Basic RGFldW4tMTAwOnBhc3N3b3Jk' },
    }
  );

  const data = await response.json();
  return data;
};

export default getCartItems;
